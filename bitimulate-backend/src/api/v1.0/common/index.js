const Router = require('koa-router');

const common = new Router();
const commonCtrl = require('./common.ctrl');

common.get('/currency-info', commonCtrl.getCurrencyInfo);
common.get('/krw-rate', commonCtrl.getKrwRate);
common.get('/ranking', commonCtrl.getRanking);

module.exports = common;