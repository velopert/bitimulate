import React from 'react';
import { PageTemplate, TradeIndexSubpage, TradeDetailSubpage } from 'components';
import { HeaderContainer } from 'containers';
import { Route } from 'react-router-dom';

const TradePage = ({match}) => {
  return (
    <PageTemplate header={<HeaderContainer solid/>} padding responsive>
      <Route path={`${match.url}/:currencyKey`} component={TradeDetailSubpage}/>
      <Route path={match.url} component={TradeIndexSubpage}/>
    </PageTemplate>
  )
};

export default TradePage;