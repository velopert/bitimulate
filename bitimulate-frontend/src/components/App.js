import React, { Component } from 'react';

import { HomePage, TradePage } from 'components';
import { Route } from 'react-router-dom';
import { ScreenMaskContainer } from 'containers';



class App extends Component {
  render() {
    return (
      <div>
        <Route exact path ="/" component={HomePage}/>
        <Route path="/trade" component={TradePage}/>
        <ScreenMaskContainer/>
      </div>
    );
  }
}

export default App;