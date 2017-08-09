import React from 'react';
import styles from './SelectCurrency.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const Currency = ({children, active, symbol}) => (
  <div className={cx('currency', {active})}>
    <div className={cx('symbol')}>{symbol}</div>
    <div className={cx('text')}>{children}</div>
  </div>
)


const SelectCurrency = ({selectedCurrency}) => {
  return (
    <div className={cx('select-currency')}>
        <Currency symbol="₩" active>KRW</Currency>
        <Currency symbol="$">USD</Currency>
        <Currency symbol="Ƀ">BTC</Currency>
    </div>
  );
};

export default SelectCurrency;