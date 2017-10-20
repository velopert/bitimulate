import React from 'react';
import styles from './WalletPage.scss';
import classNames from 'classnames/bind';
import { PageTemplate, WalletMenu, Card, WalletSubpage } from 'components';
import { HeaderContainer } from 'containers';
import { Route } from 'react-router-dom';

const cx = classNames.bind(styles);

const WalletPage = () => {
  return (
    <PageTemplate header={<HeaderContainer solid/>} padding responsive>
      <div className={cx('wallet-page')}>
        <div className={cx('side-menu')}>
          <WalletMenu/>
        </div>
        <section className={cx('content')}>
          <Card className={cx('section-card')}>
            <Route path="/wallet" exact component={WalletSubpage}/>
          </Card>
        </section>
      </div>
    </PageTemplate>
  );
};

export default WalletPage;