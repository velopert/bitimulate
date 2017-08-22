const currencyPairMap = require('./currencyPairMap');

const currencyPairs = [];
for(let key in currencyPairMap) {
  currencyPairs.push(currencyPairMap[key]);
}

module.exports = currencyPairs;