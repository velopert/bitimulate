const Router = require('koa-router');
const shortid = require('shortid');
const redis = require('redis');
const LZUTF8 = require('lzutf8');

const subscriber = redis.createClient();
subscriber.subscribe('tickers');

const ws = new Router();

function compress(str) {
  return new Promise((resolve, reject) => {
    LZUTF8.compressAsync(str, {
      outputEncoding: 'BinaryString'
    }, (result, error) => {
      if(error) reject(error);
      resolve(result);
    });
  });
}

const msgTypes = {
  ticker: 1
};

ws.get('/ws', (ctx, next) => {
  const id = shortid.generate();
  ctx.websocket.id = id;

  const listener = async (channel, message) => {
    if(channel === 'tickers') {
      const msg = JSON.stringify({
        code: msgTypes.ticker,
        data: message
      });
      try {
        const compressed = await compress(msg);
        ctx.websocket.send(compressed);
      } catch (e) {

      }
    }
  };

  subscriber.on('message', listener);

  ctx.websocket.on('close', () => {
    subscriber.removeListener('message', listener);
  }); 
});

module.exports = ws;