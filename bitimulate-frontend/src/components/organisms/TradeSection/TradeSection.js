import React from 'react';
import styles from './TradeSection.scss';
import classNames from 'classnames/bind';
import { TradeBox } from 'components';


const cx = classNames.bind(styles);

const TradeSection = () => {
  return (
    <div className={cx('trade-section')}>
      <TradeBox title="BTC 매수"/>
      <TradeBox title="BTC 매도"/>      
    </div>
  );
};

export default TradeSection;