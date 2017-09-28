const currencyInfo = require('lib/poloniex/currencyInfo');
const { getExchangeRate } = require('lib/common');

exports.getCurrencyInfo = async (ctx) => {
  // ctx.set('Last-Modified', 'Sun, 03 Sep 2017 16:04:24 GMT');
  // ctx.set('Cache-Control', 'public, max-age=31536000');
  ctx.body = currencyInfo;
};

exports.getKrwRate = async (ctx) => {
  try {
    const cached = await getExchangeRate();
    ctx.body = cached;
  } catch (e) {
    ctx.throw(e, 500);
  }
};