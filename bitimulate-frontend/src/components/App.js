import React, { Component } from 'react';

import { HomePage, TradePage, RegisterPage, WalletPage, RankingPage, ReportPage } from 'components';
import { Route } from 'react-router-dom';
import { 
  ScreenMaskContainer, 
  LoginModalContainer,
  UserLoader,
  Core
 } from 'containers';
 import { Helmet } from 'react-helmet';


class App extends Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>Bitimulate - 가상화폐 모의 거래소</title>
        </Helmet>
        <Route exact path ="/" component={HomePage}/>
        <Route path="/trade" component={TradePage}/>
        <Route path="/register" component={RegisterPage}/>
        <Route path="/wallet" component={WalletPage}/>
        <Route path="/ranking" component={RankingPage}/>
        <Route path="/report/:displayName" component={ReportPage}/>
        <ScreenMaskContainer/>
        <LoginModalContainer/>
        <UserLoader/>
        <Core/>
      </div>
    );
  }
}

export default App;