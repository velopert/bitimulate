import React from 'react';
import styles from './TradeSection.scss';
import classNames from 'classnames/bind';
import { TradeBox } from 'components';


const cx = classNames.bind(styles);

const TradeSection = ({
  currencyType,
  buy,
  sell
}) => {

  return (
    <div className={cx('trade-section')}>
      <TradeBox currencyType={currencyType} {...buy.toJS()}/>
      <TradeBox currencyType={currencyType} sell {...sell.toJS()}/>      
    </div>
  );
};

export default TradeSection;