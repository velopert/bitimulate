import React from 'react';
import styles from './WalletProfitSubpage.scss';
import classNames from 'classnames/bind';
import { Profit } from 'containers';

const cx = classNames.bind(styles);

const WalletProfitSubpage = () => (
  <section className={cx('wallet-profit-subpage')}>
    <h1>
      수익률
    </h1>
    <div className={cx('profit-wrapper')}>
      <Profit/>
    </div>
  </section>
);

export default WalletProfitSubpage;