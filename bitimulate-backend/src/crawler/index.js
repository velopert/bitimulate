require('dotenv').config();
const db = require('db');
const poloniex = require('lib/poloniex');
const ExchangeRate = require('db/models/ExchangeRate');
const socket = require('./socket');
const { parseJSON, polyfill } = require('lib/common');
const log = require('lib/log');
const currencyMap = require('lib/poloniex/currencyPairMap');
const redis = require('redis');

const publisher = redis.createClient();

const initialize = async () => {
  await db.connect();
  // await registerInitialExchangeRate();
  socket.connect();
};

async function registerInitialExchangeRate() {
  const tickers = await poloniex.getTickers();

  // removes all the data from the collection (only for temporary use)
  await ExchangeRate.drop();
  log('dropped exchangerate collection');
  const keys = Object.keys(tickers);
  const promises = keys.map(
    key => {
      const ticker = tickers[key];
      
      if (!currencyMap[ticker.id.toString()]) {
        return Promise.resolve();
      }

      const data = Object.assign({name: key}, ticker);
      const exchangeRate = new ExchangeRate(data);
      return exchangeRate.save();
    }
  );

  try {
    await Promise.all(promises);
  } catch (e) {
    console.log(e);
  }

  console.log('succeed!');
}
async function updateEntireRate() {
  log('updating entire rate...');
  const tickers = await poloniex.getTickers();
  const keys = Object.keys(tickers);

  const promises = keys.map(
    key => {
      return ExchangeRate.updateTicker(key, tickers[key]);
    }
  );

  try {
    await Promise.all(promises);
  } catch (e) {
    log.error('Oops, failed to update entire rate!');
    return;
  }

  log('done');
}

const messageHandler = {
  1002: async (data) => {
    if (!data) return;
    const converted = poloniex.convertToTickerObject(data);
    const { name, ...rest } = converted;
    if(!name) return;
    if(name === 'NULL_NULL') return;
    
    try {
      await ExchangeRate.updateTicker(name, rest);
      
      const { last, percentChange, baseVolume, quoteVolume } = converted;
      const payload = {
        name, 
        last: parseFloat(last), 
        percentChange: parseFloat(percentChange), 
        baseVolume: parseFloat(baseVolume), 
        quoteVolume: parseFloat(quoteVolume), 
        lastUpdated: new Date()
      };
      publisher.publish('general', JSON.stringify({
        type: 'TICKER',
        payload
      }));
      // log('Updated', name);
    } catch (e) {
      console.error(e);
    }
  }
};

socket.handleMessage = (message) => {
  const parsed = parseJSON(message);
  if (!parsed) {
    return null;
  }
  const [type, meta, data] = parsed;
  if (messageHandler[type]) {
    messageHandler[type](data);
  }
};

socket.handleRefresh = () => {
  updateEntireRate();
};

initialize();