import React from 'react';
import styles from './CoinMain.scss';
import classNames from 'classnames/bind';
import { CoinBlock } from 'components';

const cx = classNames.bind(styles);

// const coinTypes = ['BTC', 'BCH', 'ETH', 'LTC', 'XRP', 'DASH', 'XMR']
const CoinMain = () => {
  return ( 
    <div className={cx('coin-main')}>
      <CoinBlock/>
      <CoinBlock/>
      <CoinBlock/>
      <CoinBlock/>
      <CoinBlock/>
      <CoinBlock/>
      <CoinBlock/>
      <CoinBlock/>
    </div>
  );
}

export default CoinMain;