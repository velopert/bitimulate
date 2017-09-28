const cache = require('lib/cache');
const axios = require('axios');

async function getExchangeRate() {
  try {
    const cached = await cache.get('exchage-rate');
    if(cached) {
      return cached;
    }
    const response = await axios.get('http://api.fixer.io/latest?base=USD');
    const data = {
      KRW: response.data.rates.KRW
    };
    // caches one hour
    cache.set('exchage-rate', data, 3600);
    return data;
  } catch (e) {
    throw(e);
  }
}

module.exports = getExchangeRate;