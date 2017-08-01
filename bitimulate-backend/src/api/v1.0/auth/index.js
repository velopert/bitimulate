const Router = require('koa-router');

const auth = new Router();
const authCtrl = require('./auth.ctrl');

auth.post('/register/local', authCtrl.localRegister);
auth.post('/login/local', authCtrl.localLogin);

module.exports = auth;