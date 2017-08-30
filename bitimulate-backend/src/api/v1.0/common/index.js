const Router = require('koa-router');

const common = new Router();
const commonCtrl = require('./common.ctrl');

common.get('/currency-info', commonCtrl.getCurrencyInfo);

module.exports = common;