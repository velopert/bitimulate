import React from 'react';
import styles from './TradeIndexSubpage.scss';
import classNames from 'classnames/bind';
import { TradeIndexContainer } from 'containers';

const cx = classNames.bind(styles);

const TradeIndexSubpage = () => {
  return (
    <div className={cx('trade-index-subpage')}>
      <TradeIndexContainer/>
    </div>
  );
};

export default TradeIndexSubpage;