const WebSocket = require('ws');
const currencyPairs = require('lib/poloniex/currencyPairs');

module.exports = (function() {
  let _client = null;
  let _messageHandler = (message) => { console.warn('messageHandler not defined'); };
  let _refreshHandler = () => { console.warn('refereshHandler not defined'); };

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
    _client.on('open', handlers.open);
    _client.on('message', handlers.message);
    _client.on('close', reconnect);
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