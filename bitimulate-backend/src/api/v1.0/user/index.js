const Router = require('koa-router');

const user = new Router();
const userCtrl = require('./user.ctrl');
const needAuth = require('lib/middlewares/needAuth');

user.get('/me/metainfo', needAuth, userCtrl.getMetaInfo);
user.patch('/me/metainfo', needAuth, userCtrl.patchMetaInfo);
user.get('/me/earnings-history', needAuth, userCtrl.getEarningsHistory);
user.get('/:displayName/orders', userCtrl.checkUserExists, userCtrl.getOrdersOfUser);
user.get('/:displayName/wallet', userCtrl.checkUserExists, userCtrl.getWalletOfUser);

module.exports = user;