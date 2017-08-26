const currencyPairMap = require('./currencyPairMap');
const axios = require('axios');

module.exports = (function () {
  function getChartData(currencyPair, period = 86400, start = 1420070400, retry) {
    const createRequest = () => axios.get(`https://poloniex.com/public?command=returnChartData&currencyPair=${currencyPair}&start=${start}&end=9999999999&period=${period}`, { timeout: 15000 }).then(
      response => response.data
    );
    if(retry) {
      return new Promise((resolve, reject) => {
        const retryHandler = async () => {
          try {
            const data = await createRequest();
            if(!data || !data[0] || data[0].date === 0) {
              console.log('다시하는중이니까 기다려');
              setTimeout(() => {
                retryHandler();
              }, 500);
              return;
            }
            resolve(data);
          } catch (e) {
            setTimeout(() => {
              retryHandler();
            }, 500);
          }
        };
        retryHandler();
      });
    }

    return createRequest();
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