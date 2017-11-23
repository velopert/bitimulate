import { createStore, applyMiddleware, compose } from 'redux';
import penderMiddleware from 'redux-pender';
import modules from './modules';

const isDev = process.env.NODE_ENV === 'development' || true;

const devtools = isDev && window.devToolsExtension 
  ? window.devToolsExtension
  : () => fn => fn;
  
const configureStore = (initialState) => {
  const enhancers = [
    applyMiddleware(
      penderMiddleware()
    ),
    devtools({
      actionsBlacklist: ['trade/UPDATE_TICKER'],
      maxAge: 1000
    })
  ];

  const store = createStore(modules, initialState, compose(...enhancers));

  if(module.hot) {
    // module.hot.accept('./modules', () => {
    //   const nextReducer = require('./modules').default;
    //   store.replaceReducer(nextReducer);
    // });
  }

  if(module.hot) {
    module.hot.accept('./modules', () => store.replaceReducer(modules));
  }

  return store;
};

export default configureStore;