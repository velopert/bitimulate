import React from 'react';
import { PageTemplate, TradeIndexSubpage } from 'components';
import { HeaderContainer } from 'containers';
import { Route } from 'react-router-dom';

const TradePage = ({match}) => {
  return (
    <PageTemplate header={<HeaderContainer solid/>} padding responsive>
      <Route exact path={match.url} component={TradeIndexSubpage}/>
    </PageTemplate>
  )
};

export default TradePage;