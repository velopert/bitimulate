import React from 'react';
import styles from './TradeIndexSubpage.scss';
import classNames from 'classnames/bind';
import { TradeIndexContainer, TradeIndexOptionsContainer } from 'containers';

const cx = classNames.bind(styles);

const TradeIndexSubpage = () => {
  return (
    <div className={cx('trade-index-subpage')}>
      <TradeIndexOptionsContainer/>
      <TradeIndexContainer/>
    </div>
  );
};

export default TradeIndexSubpage;