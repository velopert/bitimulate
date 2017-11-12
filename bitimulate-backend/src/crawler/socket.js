const WebSocket = require('ws');
const currencyPairs = require('lib/poloniex/currencyPairs');
const log = require('lib/log');

module.exports = (function() {
  let _client = null;
  let _messageHandler = (message) => { console.warn('messageHandler not defined'); };
  let _refreshHandler = () => { console.warn('refereshHandler not defined'); };

  let _lastTime = null;

  const ticker = () => {
    const now = new Date();
    if(!_lastTime) return;
    const diff = now - _lastTime;
    if(diff > 8000) {
      log.error('websocket timeout');
      _lastTime = null;
      _client.close();
    }
  };

  setInterval(ticker, 1000);

  const handlers = {
    open: async () => {
      console.log('connected to server');
      await _refreshHandler();
      _client.send(`{"command": "subscribe", "channel": "1002"}`);
      // currencyPairs.forEach(pair => {
      //   _client.send(`{"command": "subscribe", "channel": "${pair}"}`);
      // });
    },
    message: (message) => {
      const current = new Date();
      _lastTime = current;
      // console.log(message);
      _messageHandler(message);
      // console.log('received: %s', message);
    }
  };

  const reconnect = () => {
    console.log('reconnecting..');
    setTimeout(connect, 100);
  };

  const connect = () => {
    _client = new WebSocket('wss://api2.poloniex.com');
    global.client = _client;
    _client.on('open', handlers.open);
    _client.on('message', handlers.message);
    _client.on('close', reconnect);
    _client.on('error', () => {
      console.log('Websocket Error!');
    });
    // error 처리
  };

  return {
    set handleMessage(messageHandler) {
      _messageHandler = messageHandler;
    },
    set handleRefresh(refreshHandler) {
      _refreshHandler = refreshHandler;
    },
    connect,
    get getClient() {
      return _client;
    }
  };
})();