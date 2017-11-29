import React from 'react';
import styles from './WalletPage.scss';
import classNames from 'classnames/bind';
import { PageTemplate, WalletMenu, Card, WalletSubpage, WalletHistorySubpage, WalletProfitSubpage, ResponsiveAd } from 'components';
import { HeaderContainer, SocketSubscriber } from 'containers';
import { Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const cx = classNames.bind(styles);

const WalletPage = () => {
  return (
    <PageTemplate header={<HeaderContainer solid/>} padding responsive mobileNoPadding>
      <Helmet>
        <title>내 지갑 :: Bitimulate</title>
      </Helmet>
      <div className={cx('wallet-page')}>
        <div className={cx('side-menu')}>
          <WalletMenu/>
        </div>
        <section className={cx('content')}>
          <Card className={cx('section-card')}>
            <div className={cx('mobile-ads')}>
              <ResponsiveAd/>
            </div>
            <Route path="/wallet" exact component={WalletSubpage}/>
            <Route path="/wallet/history" component={WalletHistorySubpage}/>
            <Route path="/wallet/profit" component={WalletProfitSubpage}/>
          </Card>
        </section>
      </div>
      <SocketSubscriber channel="TICKER"/>
      <SocketSubscriber channel="ORDER_PROCESSED"/>
    </PageTemplate>
  );
};

export default WalletPage;