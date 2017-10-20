import React from 'react';
import styles from './WalletSubpage.scss';
import classNames from 'classnames/bind';
import { TripleWallet } from 'components';

const cx = classNames.bind(styles);

const WalletSubpage = () => {
  return (
    <div className={cx('wallet-subpage')}>
      <h1>
        내 지갑
      </h1>
      <h2>
        현재 전체 보유자산
      </h2>
      <TripleWallet/>
    </div>
  );
};

export default WalletSubpage;