const Router = require('koa-router');

const auth = new Router();

auth.get('/', (ctx) => {
  ctx.body = '라우터 설정 완료!';
});

module.exports = auth;