require('dotenv').config();
const db = require('db');
const processWallets = require('./processWallets');
require('mongoose').set('debug', true);
db.connect();

async function initialize() {
  await db.connect();
  await processWallets();
}

initialize();