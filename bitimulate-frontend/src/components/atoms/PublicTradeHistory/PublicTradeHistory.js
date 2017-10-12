import React, { Component } from 'react';
import styles from './PublicTradeHistory.scss';
import classNames from 'classnames/bind';
import {limitDigit} from 'lib/utils';
import moment from 'moment';
import scuize from 'lib/hoc/scuize';

const cx = classNames.bind(styles);

const Row = ({date, type, rate, amount}) => {
  return (
    <div className={cx('row', 'flicker')}>
      <div className={cx('col', 'time')}>
        {moment(date).format('HH:mm')}
      </div>
      <div className={cx('col', 'type')}>
        {type === 'sell' ? '매도' : '매수'}
      </div>
      <div className={cx('col')}>
        {limitDigit(rate)}
      </div>
      <div className={cx('col')}>
        {limitDigit(amount)}
      </div>
    </div>
  )
}

const OptimizedRow = scuize(function (nextProps, nextState) {
  return false;
})(Row);




// // date | type | price | amount
const PublicTradeHistory = ({data}) => {
  const rows = data && data.map(
    row => <OptimizedRow id={row.get('tradeID')} key={row.get('tradeID')} {...row.toJS()}/>
  )
  return (
    <div className={cx('public-trade-history')}>
      <div className={cx('title')}>
        거래내역
      </div>
      <div className={cx('head')}>
        <div className={cx('col', 'time')}>
          시간
        </div>
        <div className={cx('col', 'type')}>
          종류
        </div>
        <div className={cx('col')}>
          가격
        </div>
        <div className={cx('col')}>
          거래량
        </div>
      </div>
      <div className={cx('rows')}>
        {rows}
      </div>

    </div>
  );
};

export default PublicTradeHistory;