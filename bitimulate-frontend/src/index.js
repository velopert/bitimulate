import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';
import 'styles/main.scss';
import registerServiceWorker from './registerServiceWorker';
import configureStore from 'store/configure';
import { AppContainer } from 'react-hot-loader';
import social from 'lib/social';

const store = configureStore();

// const render = (Component) => ReactDOM.render(
//   (
//     <AppContainer>
//       <Component store={store}/>
//     </AppContainer>
//   ), 
//   document.getElementById('root')
// );

const render = (Component) => ReactDOM.render(
  (
    <Component store={store}/>
  ), 
  document.getElementById('root')
);

render(Root);

// if(module.hot) {
//   module.hot.accept('./Root', () => render(Root))
// }

registerServiceWorker();
