const currencyInfo = require('lib/poloniex/currencyInfo');
const axios = require('axios');
const cache = require('lib/cache');

exports.getCurrencyInfo = async (ctx) => {
  // ctx.set('Last-Modified', 'Sun, 03 Sep 2017 16:04:24 GMT');
  // ctx.set('Cache-Control', 'public, max-age=31536000');
  ctx.body = currencyInfo;
};

exports.getKrwRate = async (ctx) => {
  try {
    const cached = await cache.get('exchage-rate');
    if(cached) {
      ctx.body = cached;
      return;
    }
    const response = await axios.get('http://api.fixer.io/latest?base=USD');
    const data = {
      KRW: response.data.rates.KRW
    };
    ctx.body = data;
    // caches one hour
    cache.set('exchage-rate', data, 3600);
  } catch (e) {
    ctx.throw(e, 500);
  }
};