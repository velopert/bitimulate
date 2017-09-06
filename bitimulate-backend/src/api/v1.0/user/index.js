const Router = require('koa-router');

const user = new Router();
const userCtrl = require('./user.ctrl');

user.get('/me/metainfo', userCtrl.getMetaInfo);
user.patch('/me/metainfo', userCtrl.patchMetaInfo);

module.exports = user;