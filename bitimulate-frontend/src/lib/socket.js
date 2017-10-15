import LZUTF8 from 'lzutf8';

import { bindActionCreators } from 'redux';
import { updateTicker, updateLastCandle } from 'store/modules/trade';
import * as userActions from 'store/modules/user';
import * as tradeActions from 'store/modules/trade';
import store from 'store';

const UserActions = bindActionCreators(userActions, store.dispatch);
const TradeActions = bindActionCreators(tradeActions, store.dispatch);

const parseJSON = (str) => {
  let parsed = null;
  try {
    parsed = JSON.parse(str);
  } catch (e) {
    return null;
  }
  return parsed;
}

const msgTypes = {
  ticker: 1,
  subscribe: 2,
  unsubscribe: 3
};

const SUBSCRIBE = 'SUBSCRIBE';
const UNSUBSCRIBE = 'UNSUBSCRIBE';

function decompress(data) {
  return new Promise((resolve, reject) => {
    LZUTF8.decompressAsync(data, {
      inputEncoding: 'BinaryString'
    }, (result, error) => {
      if(error) reject(error);
      resolve(result);
    })
  })
}

// packet types
const TICKER = 'TICKER';
const ORDER_PROCESSED = 'ORDER_PROCESSED';

export default (function() {
  let _store = null;
  let _socket = null;
  let _uri = null;
  let _retry = false;
  let _subscribed = [];

  function handlePacket(data) {
    const { type, payload } = data;
  
    const handlers = {
      [TICKER]: () => {
        _store.dispatch(updateTicker(payload));
        const c = _store.getState().trade.getIn(['detail', 'currencyType']);
        if(payload.name.indexOf('_') < 0 || !c) return;
        if(payload.name.split('_')[1] === c) {
          _store.dispatch(updateLastCandle(payload.last));
        }
      },
      [ORDER_PROCESSED]: () => {
        // refresh wallet
        
        UserActions.getWallet();
        TradeActions.orderProcessed(payload);
      }
    }
    
    handlers[type]();
  }

  
  const listener = async (message) => {
    try {
      // const decompressed = await decompress(message.data);
      const data = parseJSON(message.data);
      if(!data || !data.type) return;

      handlePacket(data);
    } catch (e) {
      console.log(e);
      console.log('failed to parse data');
    }
    // const data = parseJSON(message.data);
    // if(!data || data.code) return;
    // console.log(data);
  }

  const connect = (uri) => {
    _uri = uri;
    _socket = new WebSocket(uri);
    _socket.onmessage = listener;
    _socket.onopen = () => {
      console.log('connected to', uri);
      _retry = false;
      resubscribe();
    }
    _socket.onclose = reconnect;
  }

  const subscribe = (key) => {
    if(_subscribed.indexOf(key) === -1) {
      _subscribed.push(key);
    }

    if(_socket.readyState !== _socket.OPEN) return;

    console.log('subscribing to ' + key);
    _socket.send(JSON.stringify({
      type: SUBSCRIBE,
      payload: key
    }));
  }

  const unsubscribe = (key) => {
    const index = _subscribed.indexOf(key);
    if(index === -1) return;

    _subscribed.splice(index, 1);
    console.log('unscribing ' + key);

    _socket.send(JSON.stringify({
      code: msgTypes.unsubscribe,
      data: key
    }));
  }

  const resubscribe = () => {
    console.log('resubscribing...');
    _subscribed.forEach(subscribe);
  }

  const reconnect = () => {
    console.log('reconnecting to socket...');
    if(_retry) {
      // retry after 3 sec
      setTimeout(() => connect(_uri), 3000);
      return;
    }
    _retry = true;
    connect(_uri);
  }

  return {
    initialize: (store, uri) => {
      _store = store;
      connect(uri);
    },
    subscribe,
    unsubscribe
  }
})();