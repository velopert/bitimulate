const Router = require('koa-router');
const redis = require('redis');
const { parseJSON, compress } = require('./utils');
const jwtMiddleware = require('lib/middlewares/jwt');
const EventEmitter = require('events');
const log = require('lib/log');

const shortid = require('shortid');

const emitter = new EventEmitter();
emitter.setMaxListeners(0); // infinite listeners

const generalHandlers = {
  ORDER_PROCESSED: (payload) => {
    const { userId } = payload;
    const channel = `ORDER_PROCESSED:${userId}`;
    emitter.emit(channel, {
      type: 'ORDER_PROCESSED',
      payload
    });
  },
  TICKER: (payload) => {
    emitter.emit('TICKER', {
      type: 'TICKER',
      payload
    });
  }
};

const subscriber = redis.createClient();

subscriber.subscribe('general');
subscriber.on('message', (channel, message) => {
  const data = parseJSON(message);
  if(!data) return;
  const { type, payload } = data;
  if(!generalHandlers[type]) return;
  generalHandlers[type](payload);
});

const SUBSCRIBE = 'SUBSCRIBE';
const UNSUBSCRIBE = 'UNSUBSCRIBE';

const userChannels = [
  'ORDER_PROCESSED'
];

function isUserChannel(channel) {
  return userChannels.indexOf(channel) !== -1;
}

const ws = new Router();
ws.get('/ws', jwtMiddleware, (ctx, next) => {
  const { user } = ctx.request;
  ctx.websocket.id = shortid.generate();
  const subscribed = [];
  log('Connected:', ctx.websocket.id, user);
  const appendUserId = (channel) => `${channel}:${user._id}`;
  const processChannel = (channel) => isUserChannel(channel) ? appendUserId(channel) : channel;

  const publish = (data) => {
    ctx.websocket.send(JSON.stringify(data));
  };

  const subscribe = (channel) => {
    console.log(`subscribing to ${channel}`);
    subscribed.push(channel);
    emitter.on(channel, publish);
  };

  const unsubscribe = (channel) => {
    console.log(`unsubscribed ${channel}`);
    emitter.removeListener(channel, publish);
  };

  const handlers = {
    [SUBSCRIBE]: (channel) => {
      subscribe(processChannel(channel));
    },
    [UNSUBSCRIBE]: (channel) => {
      unsubscribe(processChannel(channel));
    }
  };

  const listeners = {
    onMessage: (message) => {
      const data = parseJSON(message);
      if(!data || !data.type) return; // invalid data
      const handler = handlers[data.type];
      if(!handler) return; // invalid type
      handler(data.payload);
    },
    onClose: () => {
      subscribed.forEach(unsubscribe); // unsubscribe all
    }
  };

  ctx.websocket.on('message', listeners.onMessage);

  // ctx.websockets.on('message', listeners.onMessage);
  ctx.websocket.on('close', listeners.onClose);
});

module.exports = ws;