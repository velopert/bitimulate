import React from 'react';
import styles from './TripleWallet.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const WalletBox = () => (
  <div className={cx('wallet-box')}>
    <div className={cx('currency')}>
      BTC
    </div>
    <div className={cx('value')}>
      Ƀ 10.1234
    </div>
  </div>
)

const TripleWallet = () => {
  return (
    <div className={cx('triple-wallet')}>
      <WalletBox/>
      <WalletBox/>
      <WalletBox/>
    </div>
  );
};

export default TripleWallet;