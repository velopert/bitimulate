import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';
import 'styles/main.scss';
import registerServiceWorker from './registerServiceWorker';
import store from 'store';
import { AppContainer as HotContainer } from 'react-hot-loader';
import social from 'lib/social';
import socket from 'lib/socket';
import axios from 'axios';

window.axios = axios;
const socketURI = process.env.NODE_ENV === 'production'
                    ? 'wss://221.148.121.120/ws'
                    : 'ws://221.148.121.120:4000/ws'

if(process.env.NODE_ENV === 'production') {
  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = 'https://221.148.121.120:4000';
}

console.log(socketURI);
socket.initialize(store, socketURI);

window.socket = socket;

const render = (Component) => ReactDOM.render(
  (
    <HotContainer>
      <Component store={store}/>
    </HotContainer>
  ), 
  document.getElementById('root')
);

render(Root);

if(module.hot) {
  module.hot.accept('./Root', () => render(Root))
}

registerServiceWorker();
