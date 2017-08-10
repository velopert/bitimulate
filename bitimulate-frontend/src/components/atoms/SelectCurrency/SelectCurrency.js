import React from 'react';
import styles from './SelectCurrency.scss';
import classNames from 'classnames/bind';
import { initialCurrencies } from 'lib/variables';

const currencies = initialCurrencies;

const cx = classNames.bind(styles);

const Currency = ({children, active, symbol, onClick}) => (
  <div className={cx('currency', {active})} onClick={onClick}>
    <div className={cx('symbol')}>{symbol}</div>
    <div className={cx('text')}>{children}</div>
  </div>
)

const SelectCurrency = ({currency, onSetCurrency}) => {
  const currencyList = currencies.map(
    c => (
      <Currency 
        active={currency===c.name} 
        onClick={() => onSetCurrency(c.name)}
        key={c.name}>
        {c.name}
      </Currency>
    )
  );

  return (
    <div className={cx('select-currency')}>
        {currencyList}
    </div>
  );
};

export default SelectCurrency;