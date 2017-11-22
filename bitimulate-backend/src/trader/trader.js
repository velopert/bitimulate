const ExchangeRate = require('db/models/ExchangeRate');
const Order = require('db/models/Order');
const User = require('db/models/User');
const log = require('lib/log');
const redis = require('redis');
const poloniex = require('lib/poloniex');
const cache = require('lib/cache');

const generalPublisher = redis.createClient();

module.exports = (() => {
  let syncTimeoutId = null;
  let currentExchangeRates = [];
  const pending = new Map();

  const makeUserTransaction = async (userId, currencyPair, amount, price, sell) => {
    let [ base, target ] = currencyPair.split('_');

    console.log({userId, currencyPair, amount, price, sell});
    console.log(base, target);

    // mock USDT to USD
    base = base === 'USDT' ? 'USD' : base;
    target = target === 'USDT' ? 'USD' : target;

    // buying
    /*
      1. Target ⬆️ amount
      2. WalletOnOrder[Base]: ⬇️ amount * price
    */

    // selling
    /*
      1. WalletOnOrder[Target] ⬇️ amount
      2. Base ⬆️ amount * price
    */
    
    const totalPrice = amount * price;

    try {
      const user = await User.findById(userId).exec();
      if(!user) {
        log.error(`${userId} does not exist.`);
        return;
      }

      // if(!sell && user.wallet[target] === undefined) {
      //   // if wallet target is undefined, directly set the target value
      //   return User.findByIdAndUpdate(userId, {
      //     $set: {
      //       [`wallet.${target}`]: amount * (1 - 0.0015)
      //     },
      //     $inc: {
      //       [`walletOnOrder.${base}`]: totalPrice * -1
      //     }
      //   }).exec();
      // }
      
      if(!sell) {
        return User.findByIdAndUpdate(userId, {
          $inc: {
            [`wallet.${target}`]: amount * (1),
            [`walletOnOrder.${base}`]: totalPrice * -1.0015
          }
        }).exec();
      } else {
        return User.findByIdAndUpdate(userId, {
          $inc: {
            [`wallet.${base}`]: totalPrice * (1 - 0.0015),
            [`walletOnOrder.${target}`]: amount * -1
          }
        }).exec();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const refreshExchangeRates = () => {
    return ExchangeRate.find({
    }, {
      name: true,
      last: true,
      baseVolume: true
    }).lean().exec();
  };

  const syncExchangeRate = async () => {
    try {
      currentExchangeRates = await refreshExchangeRates();
      await loopThroughCoins();
    } catch (e) {
      console.log(e);
    }
    syncTimeoutId = setTimeout(syncExchangeRate, 1000);
  };

  const findAvailableOrders = (rateInfo, sell) => {
    const multiplier = sell ? 1.02 : 0.98;
    
    return Order.find({
      status: 'waiting',
      currencyPair: rateInfo.name,
      price: {
        [sell ? '$lte' : '$gte']: rateInfo.last * multiplier
      },
      sell
    }).lean().exec();
  };

  const processOrder = async (order) => {
    const { _id, amount, userId, price, currencyPair, sell } = order;

    // find if it exists already in pending
    const idString = _id.toString();
    if(pending.get(idString)) {
      return;
    }

    pending.set(idString, true);

    const getOrderBookCached = cache.cachify(poloniex.getOrderBook, 3);

    try {
      const orderbook = await getOrderBookCached(currencyPair, 3);
      const compareKey = sell ? 'bids' : 'asks';
      const orderPrice = parseFloat(orderbook[compareKey][0][0]);
      const requirement = sell ? price <= orderPrice
        : price >= orderPrice;
      if (!requirement) {
        pending.delete(idString);
        return;
      };
    } catch (e) {
      console.log(e);
      pending.delete(idString);
      return;
    }
    
    try {
      // check its status one more time
      const currentOrder = await Order.findById(_id).exec();
      if(currentOrder.status !== 'waiting') return;

      const updatedOrder = await Order.findByIdAndUpdate(_id, { 
        status: 'processed',
        processedDate: new Date(),
        $inc: {
          processedAmount: amount
        }
      }, { new: true }).lean().exec();
      await makeUserTransaction(userId, currencyPair, amount, price, sell);
      generalPublisher.publish('general', JSON.stringify({
        type: 'ORDER_PROCESSED',
        payload: updatedOrder
      }));
    } catch (e) {
      console.log(e);
    }
    pending.delete(idString);
  };

  const loopThroughCoins = async () => {
    let availableOrders = [];
    
    const findBuyOrders = currentExchangeRates.map(
      (rateInfo) => findAvailableOrders(rateInfo, false)
    );

    const buyOrders = await Promise.all(findBuyOrders);

    buyOrders.forEach(orders => {
      if(orders.length > 0) {
        availableOrders = availableOrders.concat(orders);
      }
    });

    const findSellOrders = currentExchangeRates.map(
      (rateInfo) => findAvailableOrders(rateInfo, true)
    );

    const sellOrders = await Promise.all(findSellOrders);

    sellOrders.forEach(orders => {
      if(orders.length > 0) {
        availableOrders = availableOrders.concat(orders);
      }
    });

    availableOrders.map((order) => {
      processOrder(order);
    });

    
  };

  return {
    beginSync() {
      syncExchangeRate();
      log.info('sync began');
    },
    endSync() {
      clearTimeout(syncTimeoutId);
      syncTimeoutId = null;
    }
  };
})();
