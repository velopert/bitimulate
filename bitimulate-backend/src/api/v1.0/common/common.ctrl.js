const currencyInfo = require('lib/poloniex/currencyInfo');
const { getExchangeRate } = require('lib/common');
const User = require('db/models/User');

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

exports.getRanking = async (ctx) => {
  try {
    const ranking = await User.getTopRanking();
    ctx.body = ranking;
  } catch (e) {
    ctx.throw(e, 500);
  }
};