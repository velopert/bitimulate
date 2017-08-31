const ExchangeRate = require('db/models/ExchangeRate');

exports.getInitialExchangeRate = async (ctx) => {
  try {
    const rates = await ExchangeRate.showAll();
    ctx.body = rates;
  } catch (e) {
    ctx.throw(e, 500);
  }
};
