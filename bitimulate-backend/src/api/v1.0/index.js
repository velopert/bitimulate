const Router = require('koa-router');
const auth = require('./auth');
const wallet = require('./wallet');
const api = new Router();

api.use('/auth', auth.routes());
api.use('/wallet', wallet.routes());

module.exports = api;