const Router = require('koa-router');
const shortid = require('shortid');
const redis = require('redis');
const LZUTF8 = require('lzutf8');
const jwtMiddleware = require('lib/middlewares/jwt');
const EventEmitter = require('events');
const log = require('lib/log');
const emitter = new EventEmitter();
emitter.setMaxListeners(0); // infinite listener

const parseJSON = (str) => {
  let parsed = null;
  try {
    parsed = JSON.parse(str);
  } catch (e) {
    return null;
  }
  return parsed;
};

const subscriber = redis.createClient();
const generalSubscriber = redis.createClient();

subscriber.subscribe('tickers');
generalSubscriber.subscribe('general');

const handlers = {
  'ORDER_PROCESSED': (payload) => {
    emitter.emit(`ORDER_PROCESSED:${payload.userId}`, JSON.stringify({
      type: 'ORDER_PROCESSED',
      payload
    }));
  }
};

generalSubscriber.on('message', (channel, message) => {
  const parsed = parseJSON(message);
  
  if(!parsed) return;

  const { type, payload } = parsed;

  if(!handlers[type]) {
    log.error('UNRESOLVED MESSAGE: ', parsed);
    return;
  }

  handlers[type](payload);
});

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
  ticker: 1,
  subscribe: 2,
  unsubscribe: 3
};

ws.get('/ws', jwtMiddleware);
ws.get('/ws', (ctx, next) => {
  const id = shortid.generate();
  ctx.websocket.id = id;
  const user = ctx.request.user;
  const subscribed = [];
  
  const generalListener = (payload) => {
    console.log(payload);
  }

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

  const subscribers = {
    ORDER_PROCESSED: () => {
      const key = `ORDER_PROCESSED:${user._id}`;
      subscribed.push(key);
      /* 여기 수정하자 내일!!!! */
    }
  };

  const messageHandler = {
    [msgTypes.subscribe]: (data) => {
      if(data === 'tickers') {
        subscriber.on('message', listener);
        return;
      }
      if(!subscribers[data]) return;
      subscribers[data]();
    },
    [msgTypes.unsubscribe]: (data) => {
      if(data === 'tickers') {
        subscriber.removeListener('message', listener);
      }
    }
  };

  ctx.websocket.on('message', (message) => {
    const parsed = parseJSON(message);
    if(!parsed || !parsed.code) return;
    const handler = messageHandler[parsed.code];
    if(!messageHandler[parsed.code]) return;
    
    handler(parsed.data);
  });

  ctx.websocket.on('close', () => {
    subscriber.removeListener('message', listener);
  }); 
});

module.exports = ws;