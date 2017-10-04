const ExchangeRate = require('db/models/ExchangeRate');
const Order = require('db/models/Order');
const log = require('lib/log');

module.exports = (() => {
  let syncTimeoutId = null;
  let currentExchangeRates = [];

  const refreshExchangeRates = () => {
    return ExchangeRate.find({}, {
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
    return Order.find({
      currencyPair: rateInfo.name,
      price: {
        $gte: rateInfo.last
      },
      sell
    }).lean().exec();
  };

  const loopThroughCoins = async () => {
    let availableOrders = [];
    
    const buyOrders = currentExchangeRates.map(
      (rateInfo) => findAvailableOrders(rateInfo, false)
    );

    const result = await Promise.all(buyOrders);

    result.forEach(orders => {
      if(orders.length > 0) {
        availableOrders = availableOrders.concat(orders);
      }
    });

    log.info('active buy orders:', availableOrders);
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

