import React from 'react';
import styles from './WalletSubpage.scss';
import classNames from 'classnames/bind';
import { Wallets } from 'components';
import { WalletsContainer } from 'containers';

const cx = classNames.bind(styles);

const WalletSubpage = () => {
  return (
    <section className={cx('wallet-subpage')}>
      <h1>
        내 지갑
      </h1>
      <WalletsContainer/>
    </section>
  );
};

export default WalletSubpage;