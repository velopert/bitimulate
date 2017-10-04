const Router = require('koa-router');
const auth = require('./auth');
const wallet = require('./wallet');
const chartData = require('./chartData');
const common = require('./common');
const exchange = require('./exchange');
const user = require('./user');
const orders = require('./orders');

const api = new Router();

api.use('/auth', auth.routes());
api.use('/wallet', wallet.routes());
api.use('/chart-data', chartData.routes());
api.use('/common', common.routes());
api.use('/exchange', exchange.routes());
api.use('/user', user.routes());
api.use('/orders', orders.routes());

module.exports = api;