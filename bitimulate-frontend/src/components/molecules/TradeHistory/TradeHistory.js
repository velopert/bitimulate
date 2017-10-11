import React from 'react';
import styles from './TradeHistory.scss';
import classNames from 'classnames/bind';
import { Card, PublicTradeHistory } from 'components';

const cx = classNames.bind(styles);

const TradeHistory = ({historyData}) => {
  return (
    <div className={cx('trade-history')}>
      <div className={cx('column')}>
        <Card noPadding>
          <PublicTradeHistory data={historyData}/>
        </Card>
      </div>
      <div className={cx('column')}>
        <Card/>
      </div>
    </div>
  );
};

export default TradeHistory;