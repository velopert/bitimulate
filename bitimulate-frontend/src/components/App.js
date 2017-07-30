import React, { Component } from 'react';

import { HomePage, TradePage } from 'components';
import { Route } from 'react-router-dom';


class App extends Component {
  render() {
    return (
      <div>
        <Route exact path ="/" component={HomePage}/>
        <Route path="/trade" component={TradePage}/>
      </div>
    );
  }
}

export default App;