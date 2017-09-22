const Router = require('koa-router');

const common = new Router();
const commonCtrl = require('./common.ctrl');

common.get('/currency-info', commonCtrl.getCurrencyInfo);
common.get('/krw-rate', commonCtrl.getKrwRate);

module.exports = common;