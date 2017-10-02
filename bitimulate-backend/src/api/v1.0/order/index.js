const Router = require('koa-router');

const order = new Router();
const orderCtrl = require('./order.ctrl');

order.post('/', orderCtrl.createOrder);

module.exports = order;