const currencyPairMap = require('./currencyPairMap');
const axios = require('axios');

module.exports = (function () {
  function getChartData(currencyPair, period = 86400, start = 1420070400, retry) {
    return axios.get(`https://poloniex.com/public?command=returnChartData&currencyPair=${currencyPair}&start=${start}&end=9999999999&period=${period}`, { timeout: 15000 }).then(
      response => response.data
    );
  }

  function getCurrencyPairName(id) {
    if(id > 193) { 
      return 'NULL_NULL';
    }
    return currencyPairMap[id.toString()];
  }

  function getTickers() {
    return axios.get('https://poloniex.com/public?command=returnTicker').then(
      response => response.data
    );
  };

  function convertToTickerObject(data) {
    const keys = [
      'id',
      'last',
      'lowestAsk',
      'highestBid',
      'percentChange',
      'baseVolume',
      'quoteVolume',
      'isFrozen',
      'high24hr',
      'low24hr'
    ];
    const object = {};
    data.forEach((value, i) => {
      // sets the name value
      if (i === 0) {
        object.name = getCurrencyPairName(value);
        return;
      }
      const key = keys[i];
      object[key] = value;
    });

    return object;
  }

  return {
    getCurrencyPairName,
    getTickers,
    convertToTickerObject,
    getChartData
  };
})();