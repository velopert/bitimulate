const currencyInfo = require('lib/poloniex/currencyInfo');

exports.getCurrencyInfo = async (ctx) => {
  ctx.set('Last-Modified', 'Wed, 30 Aug 2017 16:12:51 GMT');
  ctx.set('Cache-Control', 'public, max-age=31536000');
  ctx.body = currencyInfo;
};