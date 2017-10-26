import React from 'react';
import styles from './TradeHistory.scss';
import classNames from 'classnames/bind';
import { Card, TradeHistoryTable } from 'components';

const cx = classNames.bind(styles);

const TradeHistory = ({historyData, privateOrders, onCancelOrder, onScroll, hasNext}) => {
  return (
    <div className={cx('trade-history')}>
      <div className={cx('column')}>
        <Card noPadding>
          <TradeHistoryTable data={historyData}/>
        </Card>
      </div>
      <div className={cx('column')}>
        <Card noPadding>
          <TradeHistoryTable data={privateOrders} personal onCancelOrder={onCancelOrder} onScroll={onScroll} hasNext={hasNext} showTooltip/>
        </Card>
      </div>
    </div>
  );
};

export default TradeHistory;