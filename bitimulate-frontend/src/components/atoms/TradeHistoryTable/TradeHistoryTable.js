import React, { Component } from 'react';
import styles from './TradeHistoryTable.scss';
import classNames from 'classnames/bind';
import {limitDigit} from 'lib/utils';
import moment from 'moment';
import scuize from 'lib/hoc/scuize';
import ReactTooltip from 'react-tooltip';

const cx = classNames.bind(styles);


const Row = ({date, type, rate, amount, personal, processed}) => {
  return (
    <div className={cx('row', 'flicker', { personal })}>
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
      { personal && <div className={cx('col', 'status', {
        processed
      })}>
          상태
        </div>}
    </div>
  )
}

const OptimizedRow = scuize(function (nextProps, nextState) {
  return false;
})(Row);




// // date | type | price | amount
const TradeHistoryTable = ({data, personal}) => {

  const tooltip = personal ? {
    'data-tip': "항목을 더블클릭하여 거래 취소",
    'data-effect': 'solid'
  } : {} 

  const rows = data && data.map(
    row => <OptimizedRow id={row.get('tradeID')} key={row.get('tradeID')} {...row.toJS()} personal={personal}/>
  )
  return (
    <div className={cx('trade-history-table')}>
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
        { personal && <div className={cx('col', 'status')}>
          상태
        </div>}
      </div>
      <div className={cx('rows')} {...tooltip}>
        {rows}
      </div>
      <ReactTooltip />
    </div>
  );
};

export default TradeHistoryTable;