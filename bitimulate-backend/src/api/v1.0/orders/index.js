const Router = require('koa-router');

const orders = new Router();
const ordersCtrl = require('./orders.ctrl');

orders.get('/', ordersCtrl.getOrders);
orders.post('/', ordersCtrl.createOrder);

module.exports = orders;