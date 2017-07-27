const Router = require('koa-router');
const auth = require('./auth');

const api = new Router();

api.use('/auth', auth.routes());

module.exports = api;