import React from 'react';
import { PageTemplate, TradeIndexSubpage, TradeDetailSubpage, ResponsiveAd } from 'components';
import { HeaderContainer } from 'containers';
import { Route } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './TradePage.scss';
const cx = classNames.bind(styles);


const TradePage = ({match}) => {
  return (
    <PageTemplate header={<HeaderContainer solid/>} padding responsive>
      <div className={cx('ad-area')}>
        <ResponsiveAd/>
      </div>

      <Route path={`${match.url}/:currencyKey`} component={TradeDetailSubpage}/>
      <Route path={match.url} component={TradeIndexSubpage}/>
    </PageTemplate>
  )
};

export default TradePage;