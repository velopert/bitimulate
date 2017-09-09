import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';
import 'styles/main.scss';
import registerServiceWorker from './registerServiceWorker';
import store from 'store';
import { AppContainer } from 'react-hot-loader';
import social from 'lib/social';
import socket from 'lib/socket';

const socketURI = process.env.NODE_ENV === 'production'
                    ? (window.location.protocol === 'https://' ? 'wss://' : 'ws://') + window.location.host + '/ws'
                    : 'ws://localhost:4000/ws'

console.log(socketURI);
socket.initialize(store, socketURI);

const render = (Component) => ReactDOM.render(
  (
    <AppContainer>
      <Component store={store}/>
    </AppContainer>
  ), 
  document.getElementById('root')
);

render(Root);

if(module.hot) {
  module.hot.accept('./Root', () => render(Root))
}

registerServiceWorker();
