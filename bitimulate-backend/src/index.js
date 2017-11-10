// load environment variables
require('dotenv').config();
const {
  PORT: port,
  MONGO_URI: mongoURI
} = process.env;

const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const compress = require('koa-compress');
const websockify = require('koa-websocket');

// const koaStatic = require('koa-static');
// const path = require('path');
// const fs = require('fs');

const db = require('./db');

const api = require('./api');
const jwtMiddleware = require('lib/middlewares/jwt');
const cache = require('lib/cache');
const ws = require('./ws');

// const frontendBuild = path.join(__dirname, '../../bitimulate-frontend/build');
// const indexPagePath = path.join(frontendBuild, 'index.html');
// const indexPage = fs.readFileSync(indexPagePath);

db.connect();
const app = websockify(new Koa());

app.use((ctx, next) => {
  const allowedHosts = [
    'bitimulate.com',
    's3.bitimulate.com.s3-website.ap-northeast-2.amazonaws.com'
  ];
  const origin = ctx.header['origin'];
  allowedHosts.every(el => {
    if(!origin) return false;
    if(origin.indexOf(el) !== -1) {
      ctx.response.set('Access-Control-Allow-Origin', origin);
      return false;
    }
    return true;
  });
  ctx.set('Access-Control-Allow-Credentials', true);
  ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-timebase');
  ctx.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, PATCH, OPTIONS');
  return next();
});

app.use(compress());

app.use(jwtMiddleware);
app.use(bodyParser());

const router = new Router();
router.use('/api', api.routes());

app.use(router.routes());
app.use(router.allowedMethods());
app.ws.use(ws.routes()).use(ws.allowedMethods());

// app.use(koaStatic(frontendBuild));
// app.use((ctx) => {
//   ctx.body = indexPage;
// });

app.listen(port, () => {
  console.log(`bitimulate server is listening to port ${port}`);
});