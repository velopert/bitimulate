require('dotenv').config();
const db = require('db');
const User = require('db/models/User');
const ExchangeRate = require('db/models/ExchangeRate');
const log = require('lib/log');
const progress = require('cli-progress');

const batchSize = 100; // 1000;

function getUsersCount() {
  return User.count().exec();
}

function getAllExchangeRate() {
  return ExchangeRate.find().lean().exec();
}

function getPrice(rates, name) {
  if(name === 'USD') {
    const btcRate = rates.find(rate => rate.name === 'USDT_BTC');
    return 1 / btcRate.last;
  }

  if(name === 'BTC') {
    return 1;
  }

  const currentRate = rates.find(rate => {
    return rate.name.split('_')[1] === name;
  });

  return currentRate.last;
}

function combineWallet(wallet, walletOnOrder) {
  const combined = {};
  for(let currency in wallet) {
    combined[currency] = wallet[currency] + (walletOnOrder[currency] || 0);
  }
  return combined;
}

function convertToBTC(wallet, rates) {
  let btc = 0;
  for(let currency in wallet) {
    const btcPrice = getPrice(rates, currency);
    if(btcPrice) {
      btc += wallet[currency] * btcPrice;
    }
  }
  return btc;
}

function getInitialUSDAmount(initial) {
  const { currency, value, usdRate } = initial;
  if(currency === 'USD') return value.value;
  return value.value / usdRate;
}

async function processWallets() {
  try {
    const rates = await getAllExchangeRate();
    const count = await getUsersCount();

    const usdRate = getPrice(rates, 'USD');
    log.info(count, 'users');
    const length = Math.ceil(count / batchSize);

    const bar = new progress.Bar({}, progress.Presets.shades_classic);
    bar.start(length - 1, 0);
    for(let i = 0; i < length; i++) {
      const users = await User.find().skip(i * batchSize).limit(batchSize).exec();
      const promises = users.map(user => {
        const combined = combineWallet(user.wallet, user.walletOnOrder);
        const btc = convertToBTC(combined, rates);
        const currentUSD = btc / usdRate;
        return user.saveMonthlyUSD(currentUSD, usdRate);
      });
      await Promise.all(promises);
      bar.update(i);
    }
    bar.stop();
  } catch (e) {
    console.log(e);
  }
  console.log('processing wallets...');
}

const start = async () => {
  db.connect();
  await processWallets();
  db.disconnect();
};

start();