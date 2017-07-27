const Router = require('koa-router');
const versions = {
  '1.0': require('./v1.0')
};

const api = new Router();

api.use('/v1.0', versions['1.0'].routes());

module.exports = api;