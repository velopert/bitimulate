import React from 'react';
import styles from './Wallets.scss';
import classNames from 'classnames/bind';
import { TripleWallet, WalletTable } from 'components';
const cx = classNames.bind(styles);

const Wallets = ({
  sum,
  krwRate,
  btcMultiplier,
  walletData,
  hideName
}) => (
  <div className={cx('wallets')}>
    <section>
      <h2>
        현재 총합 보유 자산
      </h2>
      <TripleWallet
        btc={sum}
        usd={sum * btcMultiplier}
        krw={sum * btcMultiplier * krwRate}
      />
    </section>
    <section>
      <h2>화폐별 지갑</h2>
      <WalletTable data={walletData} hideName={hideName}/>
    </section>
  </div>
);

export default Wallets;