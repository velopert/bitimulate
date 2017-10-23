import React from 'react';
import styles from './WalletTable.scss';
import classNames from 'classnames/bind';
import { limitDigit } from 'lib/utils';

const cx = classNames.bind(styles);

const Row = ({
  currency,
  currencyName,
  value,
  valueOnOrder,
  btcValue
}) => (
  <div className={cx('row')}>
    <div className={cx('col', 'coin')}>{currency}</div>
    <div className={cx('col', 'name')}>{currencyName}</div>
    <div className={cx('col', 'has')}>{limitDigit(value)}</div>
    <div className={cx('col', 'waiting')}>{limitDigit(valueOnOrder)}</div>
    <div className={cx('col', 'btc')}>{limitDigit(btcValue)}</div>
  </div>
)

const WalletTable = ({data}) => {
  if(!data) return null;
  
  const rows = data.map(
    (wallet) => {
      const { currency, currencyName, value, valueOnOrder, last } = wallet;
      return (
        <Row
          key={currency}
          currency={currency}
          currencyName={currencyName}
          value={value}
          valueOnOrder={valueOnOrder}
          btcValue={value * last}
        />      
      )
    }
  )
  return (
    <div className={cx('wallet-table')}>
      <div className={cx('table-head')}>
        <div className={cx('col', 'coin')}>코인</div>
        <div className={cx('col', 'name')}>이름</div>
        <div className={cx('col', 'has')}>보유량</div>
        <div className={cx('col', 'waiting')}>거래 대기중</div>
        <div className={cx('col', 'btc')}>BTC 가치</div>
      </div>
      <div className={cx('rows')}>
        {rows}
      </div>
    </div>
  );
};

export default WalletTable;