const Router = require('koa-router');

const auth = new Router();
const authCtrl = require('./auth.ctrl');

auth.get('/', (ctx) => {
  ctx.body = '라우터 설정 완료!';
});

auth.post('/register/local', authCtrl.localRegister);

module.exports = auth;