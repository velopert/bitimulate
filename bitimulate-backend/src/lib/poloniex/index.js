const currencyPairMap = require('./currencyPairMap');
const axios = require('axios');

module.exports = (function () {
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
    convertToTickerObject
  };
})();