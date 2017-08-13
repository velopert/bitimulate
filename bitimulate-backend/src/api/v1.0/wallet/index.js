const Router = require('koa-router');

const wallet = new Router();
const walletCtrl = require('./wallet.ctrl');

wallet.get('/', walletCtrl.get);

module.exports = wallet;