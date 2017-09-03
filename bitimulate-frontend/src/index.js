import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';
import 'styles/main.scss';
import registerServiceWorker from './registerServiceWorker';
import store from 'store';
import { AppContainer } from 'react-hot-loader';
import social from 'lib/social';

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
