import React from 'react';
import styles from './WalletSubpage.scss';
import classNames from 'classnames/bind';
import { TripleWallet, WalletTable } from 'components';
import { TripleWalletContainer } from 'containers';

const cx = classNames.bind(styles);

const WalletSubpage = () => {
  return (
    <section className={cx('wallet-subpage')}>
      <h1>
        내 지갑
      </h1>
      <section>
        <h2>
          현재 총합 보유 자산
        </h2>
        <TripleWalletContainer/>
      </section>
      <section>
        <h2>화폐별 지갑</h2>
        <WalletTable/>
      </section>
    </section>
  );
};

export default WalletSubpage;