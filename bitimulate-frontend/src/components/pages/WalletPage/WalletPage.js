import React from 'react';
import styles from './WalletPage.scss';
import classNames from 'classnames/bind';
import { PageTemplate, WalletMenu, Card } from 'components';
import { HeaderContainer } from 'containers';

const cx = classNames.bind(styles);

const WalletPage = () => {
  return (
    <PageTemplate header={<HeaderContainer solid/>} padding responsive>
      <div className={cx('wallet-page')}>
        <div className={cx('side-menu')}>
          <WalletMenu/>
        </div>
        <section className={cx('content')}>
          <Card/>
        </section>
      </div>
    </PageTemplate>
  );
};

export default WalletPage;