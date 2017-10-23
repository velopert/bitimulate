import React from 'react';
import styles from './TripleWallet.scss';
import classNames from 'classnames/bind';
import { limitDigit } from 'lib/utils';

const cx = classNames.bind(styles);

const WalletBox = ({value, currency, sign}) => (
  <div className={cx('wallet-box')}>
    <div className={cx('currency')}>
      {currency}
    </div>
    <div className={cx('value')}>
      {sign} {limitDigit(value, 10, true, currency !== 'BTC')}
    </div>
  </div>
)

const TripleWallet = ({btc, usd, krw}) => {
  return (
    <div className={cx('triple-wallet')}>
      <WalletBox currency="BTC" sign="Ƀ" value={btc}/>
      <WalletBox currency="USD" sign="$" value={usd}/>
      <WalletBox currency="KRW" sign="₩" value={krw}/>
    </div>
  );
};

export default TripleWallet;