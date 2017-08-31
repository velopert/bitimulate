const Router = require('koa-router');

const exchange = new Router();
const exchangeCtrl = require('./exchange.ctrl');

exchange.get('/', exchangeCtrl.getInitialExchangeRate);

module.exports = exchange;