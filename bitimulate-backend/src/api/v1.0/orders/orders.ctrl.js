const currencyPairs = require('lib/poloniex/currencyPairs');
const Joi = require('joi');
const User = require('db/models/User');
const Order = require('db/models/Order');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const queryString = require('query-string');

exports.getOrders = async (ctx) => {
  const { user } = ctx.request;
  const { cursor, currencyPair, status } = ctx.query;

  // needs auth
  if(!user) {
    ctx.status = 401;
    return;
  }

  try {
    const orders = await Order.findOrders(ObjectId(user._id), cursor, currencyPair, status);
    const { protocol, host, path } = ctx;
    
    const urlQuery = queryString.stringify({
      cursor: orders.length === 20 ? orders[orders.length - 1]._id : '',
      currencyPair,
      status
    });

    // const nextUrl = `${protocol}://${host}${path}?${urlQuery}`;
    const nextUrl = `${path}?${urlQuery}`;
    if(orders.length === 20) {
      ctx.response.set('Link', `<${nextUrl}>; rel="next"`);
    }

    ctx.body = orders;
  } catch (e) {
    ctx.throw(e, 500);
  }
};

exports.createOrder = async (ctx) => {
  let {
    currencyPair,
    price,
    amount,
    sell
  } = ctx.request.body;

  price = parseFloat(price);
  amount = parseFloat(amount);

  const { user } = ctx.request;

  // needs auth
  if(!user) {
    ctx.status = 401;
    return;
  }

  // check schema
  const schema = Joi.object({
    currencyPair: Joi.string().required(),
    price: Joi.number().greater(0).required(),
    amount: Joi.number().greater(0).required(),
    sell: Joi.boolean().required()
  });

  const result = Joi.validate(ctx.request.body, schema);
  if(result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }
    
  // check currencyPair existancy
  if(currencyPairs.indexOf(currencyPair) === -1) {
    ctx.status = 400;
    ctx.body = {
      msg: 'invalid currencypair'
    };
    return;
  }

  const totalAmount = parseFloat(price) * parseFloat(amount);

  try {
    const userData = await User.findById(user._id).exec();
    const { wallet, walletOnOrder } = userData;
    const baseCurrency = (() => {
      if(currencyPair === 'USDT_BTC') {
        return sell ? 'BTC' : 'USD';
      }
      return sell ? currencyPair.split('_')[1] : 'BTC';
    })();

    if(!sell && totalAmount * 1.0015 > (wallet[baseCurrency] || 0)) {
      ctx.status = 400;
      ctx.body = {
        msg: 'exceeds available amount'
      };
      return;
    }

    if(sell && amount > (wallet[baseCurrency] || 0)) {
      ctx.status = 400;
      ctx.body = {
        msg: 'exceeds available amount'
      };
      return;
    }
    
    // create order
    const order = new Order({
      userId: mongoose.Types.ObjectId(user._id),
      currencyPair,
      price: parseFloat(price),
      amount: parseFloat(amount),
      sell
    });

    if(sell) {
      await User.findByIdAndUpdate(user._id, {
        $inc: {
          [`wallet.${baseCurrency}`]: -1 * amount,
          [`walletOnOrder.${baseCurrency}`]: amount
        }
      }).exec();
    } else {
      // different approach depending value existancy
      await User.findByIdAndUpdate(user._id, {
        $inc: {
          [`wallet.${baseCurrency}`]: -1.0015 * totalAmount,
          [`walletOnOrder.${baseCurrency}`]: totalAmount * 1.0015
        }
      }).exec();
    }

    await order.save();

    ctx.body = {
      _id: order._id,
      currencyPair,
      price,
      amount,
      sell,
      status: 'waiting'
    };
  } catch (e) {
    ctx.throw(e, 500);
  }
};

exports.cancelOrder = async (ctx) => {
  // - from walletOnOrder
  // + to wallet
  // change status to cancel
  const { user } = ctx.request;

  const { id } = ctx.params;
  if(!mongoose.Types.ObjectId.isValid(id)) {
    ctx.status = 400; // Bad Request
    return;
  }

  try {
    const order = await Order.findById(id).lean().exec(); 
    if(!order) {
      ctx.status = 404; // Not Found
      return;
    }

    if(order.status !== 'waiting') {
      ctx.status = 400;
      ctx.body = {
        message: 'not cancellable'
      };
      return;
    }

    const { price, amount, sell, currencyPair } = order;
    const totalAmount = price * amount;

    const baseCurrency = (() => {
      if(currencyPair === 'USDT_BTC') {
        return sell ? 'BTC' : 'USD';
      }
      return sell ? currencyPair.split('_')[1] : 'BTC';
    })();

    if(order.sell) {
      await User.findByIdAndUpdate(user._id, {
        $inc: {
          [`wallet.${baseCurrency}`]: amount,
          [`walletOnOrder.${baseCurrency}`]: amount * -1
        }
      }).exec();
    } else {
      await User.findByIdAndUpdate(user._id, {
        $inc: {
          [`wallet.${baseCurrency}`]: totalAmount * 1.0015,
          [`walletOnOrder.${baseCurrency}`]: totalAmount * -1.0015
        }
      }).exec();
    }
    
    const updatedOrder = await Order.findByIdAndUpdate(id, {
      $set: {
        status: 'cancelled'
      }
    }, {
      new: true
    }).exec();

    ctx.body = updatedOrder;
  } catch (e) {
    ctx.throw(500, e);
  }
};