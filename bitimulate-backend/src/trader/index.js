require('dotenv').config();
const log = require('lib/log');
const db = require('db');
const trader = require('./trader');

const initialize = async () => {
  await db.connect();
  trader.beginSync();
};

initialize();
// sync current price every 1sec
