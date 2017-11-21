import React from 'react';
import styles from './WalletTable.scss';
import classNames from 'classnames/bind';
import { limitDigit, decimalToPercentString } from 'lib/utils';
import {Link} from 'react-router-dom';

const cx = classNames.bind(styles);

const Row = ({
  currency,
  currencyName,
  value,
  valueOnOrder,
  btcValue,
  percentChange
}) => (
  <Link to={`/trade/${currency}`}  className={cx('row')}>
    <div className={cx('col', 'coin')}>{currency}</div>
    <div className={cx('col', 'percent')}>{percentChange&&<span className={cx({
      negative: percentChange < 0,
      positive: percentChange > 0
    })}>{percentChange > 0 && '+'}{decimalToPercentString(percentChange)}</span>}</div>
    <div className={cx('col', 'name')}>{currencyName}</div>
    <div className={cx('col', 'has')}>{limitDigit(value)}</div>
    <div className={cx('col', 'waiting')}>{limitDigit(valueOnOrder)}</div>
    <div className={cx('col', 'btc')}>{limitDigit(btcValue)}</div>
  </Link>
)

const WalletTable = ({data}) => {
  if(!data) return null;
  
  const rows = data.map(
    (wallet) => {
      const { currency, currencyName, value, valueOnOrder, last, percentChange } = wallet;
      return (
        <Row
          key={currency}
          currency={currency}
          currencyName={currencyName}
          value={value}
          valueOnOrder={valueOnOrder}
          btcValue={value * last}
          percentChange={percentChange}
        />      
      )
    }
  )
  return (
    <div className={cx('wallet-table')}>
      <div className={cx('table-head')}>
        <div className={cx('col', 'coin')}>코인</div>
        <div className={cx('col', 'perecent')}>변화율</div>
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