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
import ReactGA from 'react-ga';

function logPageView() {
  ReactGA.set({ page: window.location.pathname + window.location.search });
  ReactGA.pageview(window.location.pathname + window.location.search);
}

class App extends Component {
  componentWillReceiveProps(nextProps) {
    if(nextProps.location !== this.props.location) {
      logPageView();
    }
  }
  
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
        <Route path="/ranking/:type?" component={RankingPage}/>
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