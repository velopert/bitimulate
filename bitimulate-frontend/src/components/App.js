import React, { Component } from 'react';

import { HomePage, TradePage } from 'components';
import { Route } from 'react-router-dom';
import { ScreenMaskContainer, LoginModalContainer } from 'containers';

class App extends Component {
  render() {
    return (
      <div>
        <Route exact path ="/" component={HomePage}/>
        <Route path="/trade" component={TradePage}/>
        <ScreenMaskContainer/>
        <LoginModalContainer/>
      </div>
    );
  }
}

export default App;