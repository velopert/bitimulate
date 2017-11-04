import React, { Component } from 'react';
import styles from './TradeHistoryTable.scss';
import classNames from 'classnames/bind';
import {limitDigit} from 'lib/utils';
import moment from 'moment';
import scuize from 'lib/hoc/scuize';
import ReactTooltip from 'react-tooltip';
import { Spinner } from 'components';

const cx = classNames.bind(styles);

const statusMap = {
  'processed': '완료',
  'waiting': '대기',
  'cancelled': '취소됨'
}

const Row = ({date, type, rate, amount, personal, status, onCancelOrder, id, showCurrency, currencyPair}) => {
  const d = new Date(date);
  const calculatedGMT = new Date(d.valueOf() - d.getTimezoneOffset() * 60000)
  return (
    <div className={cx('row', 'flicker', { personal })} onDoubleClick={
      () => {
        if(!onCancelOrder) return;
        if(status !== 'waiting') return;
        onCancelOrder(id);
      }
    }>
    {
      showCurrency && <div className={cx('col', 'currency')}>{currencyPair && currencyPair.split('_')[1]}</div>
    }
      <div className={cx('col', 'time')}>
        {moment(personal ? date : calculatedGMT).format('HH:mm')}
      </div>
      <div className={cx('col', 'type', type)}>
        {type === 'sell' ? '매도' : '매수'}
      </div>
      <div className={cx('col')}>
        {limitDigit(rate)}
      </div>
      <div className={cx('col')}>
        {limitDigit(amount)}
      </div>
      { personal && <div className={cx('col', 'status', status)}>
          {statusMap[status]}
        </div>}
    </div>
  )
}

const OptimizedRow = scuize(function (nextProps, nextState) {
  return this.props.status !== nextProps.status;
})(Row);




// // date | type | price | amount
const TradeHistoryTable = ({data, personal, onCancelOrder, onScroll, hasNext, forPage, showTooltip}) => {

  const tooltip = showTooltip && personal ? {
    'data-tip': "항목을 더블클릭하여 거래 취소",
    'data-effect': 'solid'
  } : {} 

  const rows = data && data.map(
    row => {
      if(!personal) {
        return <OptimizedRow id={row.get('tradeID')} key={row.get('tradeID')} {...row.toJS()}/>;
      } else {
        const { 
          _id, price, amount, status, sell, currencyPair, date
        } = row.toJS();
        return <OptimizedRow 
            personal 
            currencyPair={currencyPair} 
            key={_id} 
            id={_id} 
            rate={price} 
            amount={amount} 
            type={sell ? 'sell' : 'buy'} 
            status={status} 
            onCancelOrder={onCancelOrder} 
            date={date} 
            showCurrency={forPage}
          />
      }
    }
  )
  return (
    <div className={cx('trade-history-table', { forPage })}>
      { !forPage && <div className={cx('title')}>
        {personal ? '나의 ' : '' }거래내역
      </div> }
      <div className={cx('head')}>
        { forPage && <div className={cx('col', 'currency')}>
          코인
        </div> }
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
      <div className={cx('rows')} {...tooltip} onScroll={onScroll}>
        {rows}
        { hasNext && (
          <div className={cx('scroll-block')}>
            <Spinner size="5rem"/>
          </div>
        )}
        {
          rows.isEmpty() && forPage && <div className={cx('empty')}>거래내역이 없습니다</div>
        }

      </div>
      <ReactTooltip />
    </div>
  );
};

export default TradeHistoryTable;