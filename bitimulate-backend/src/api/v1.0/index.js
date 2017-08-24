const Router = require('koa-router');
const auth = require('./auth');
const wallet = require('./wallet');
const chartData = require('./chartData');

const api = new Router();

api.use('/auth', auth.routes());
api.use('/wallet', wallet.routes());
api.use('/chart-data', chartData.routes());
module.exports = api;