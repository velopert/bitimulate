require('dotenv').config();

const poloniex = require('lib/poloniex');
const db = require('db');
const ExchangeRate = require('db/models/ExchangeRate');
const ChartData = require('db/models/ChartData');
const socket = require('./socket');
const { parseJSON, polyfill } = require('lib/common');
const currencyPairs = require('lib/poloniex/currencyPairs');
const progress = require('cli-progress');
const Worker = require('./worker');
const config = require('./config.json');
const log = require('lib/log');
const jsonfile = require('jsonfile');
const path = require('path');

function updateDate() {
  const file = path.join(__dirname, 'config.json');
  return new Promise((resolve, reject) => {
    jsonfile.writeFile(file, {
      lastUpdatedDate: new Date().getTime()
    }, (err) => {
      if(err) reject(err);
      resolve();
    });
  });
}

const initialize = async () => {
  await db.connect();

  const { lastUpdatedDate } = config;

  if(!lastUpdatedDate) {
    await ChartData.drop();
    log.info('dropped ChartData');
  }

  const from = {
    yearly: lastUpdatedDate ? lastUpdatedDate / 1000 : 1420070400,
    weekly: lastUpdatedDate ? lastUpdatedDate / 1000 : (new Date() / 1000) - 60 * 60 * 24 * 7
  };
  
  // await importData(undefined, from.yearly);
  const current = (new Date()) / 1000;
  // await importData(300, from.weekly);
  // await importData(300, current);
  startChartDataListener(new Date() / 1000);

  updateDate();

  socket.connect();
};

function startChartDataListener(initialTime) {
  let start = initialTime;
  log.info('ChartDataListener is started');
  
  const work = async () => {
    try {
      await waitForNewChartData(start);
      log.info('poloniex chart data is updated');
      await importData(300, start + 1, true);
      start = (new Date()) / 1000;
      work();
    } catch (e) {
      setTimeout(() => {
        work();
      }, 5000);
    }
  };

  work();
}

function waitForNewChartData(lastTime) {
  return new Promise((resolve, reject) => {
    // poloniex.getChartData(currencyPair, period, start)
    const checkForNew = () => {
      poloniex.getChartData('ETH_ZRX', 300, lastTime + 1).then(
        (data) => {
          log(JSON.stringify(data));
          // data is empty
          if(!data || !data[0] || data[0].date === 0) {
            setTimeout(() => {
              checkForNew();
            }, 1000);
            return;
          }

          resolve();
        }
      ).catch(e => {
        setTimeout(() => {
          checkForNew();
        }, 1000);
      });
    };

    checkForNew(3);
  });
}

async function registerInitialExchangeRate() {
  const tickers = await poloniex.getTickers();

  // removes all the data from the collection (only for temporary use)
  await ExchangeRate.drop();
  log('dropped exchangerate collection');
  const keys = Object.keys(tickers);
  const promises = keys.map(
    key => {
      const ticker = tickers[key];
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

async function importData(period = 86400, start, retry) {
  log('loading ChartData...');

  // create the list of requests
  const requests = currencyPairs.map((currencyPair) => () => poloniex.getChartData(currencyPair, period, start, retry).then(
    (data) => {
      ChartData.massImport(currencyPair, data, period);
    }
  ));

  // initialize progressbar
  const bar = new progress.Bar({}, progress.Presets.shades_classic);
  bar.start(currencyPairs.length, 0);

  let done = 0;

  const notify = () => {
    done++;
    bar.update(done);
  };

  const count = Math.ceil(requests.length / 6);

  // create 6 workers
  const workers = new Array(6).fill(0).map((_, i) => {
    const sliced = requests.slice(count * i, count * (i + 1));
    return new Worker(sliced, notify);
  });

  const works = workers.map(worker => worker.work());

  try {
    await Promise.all(works);
    bar.stop();
  } catch (e) {
    console.log(e);
  }
}

async function updateEntireRate() {
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
    console.error('Oops, failed to update entire rate!');
    return;
  }

  console.log('Updated entire rate.');
}

const messageHandler = {
  1002: async (data) => {
    if (!data) return;
    const converted = poloniex.convertToTickerObject(data);
    const { name } = converted;
    const rest = polyfill.objectWithoutProperties(converted, 'name');
    
    try {
      await ExchangeRate.updateTicker(name, rest);
      // console.log('[Update]', name, new Date());
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