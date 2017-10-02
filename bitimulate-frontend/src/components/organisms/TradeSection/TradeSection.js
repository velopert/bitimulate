import React from 'react';
import styles from './TradeSection.scss';
import classNames from 'classnames/bind';
import { TradeBox } from 'components';


const cx = classNames.bind(styles);

const TradeSection = ({
  currencyType,
  buy,
  sell,
  onChangeInput,
  onRefreshPrice,
  wallet
}) => {

  const onChangeFor = (type) => (e) => {
    const { name, value } = e.target;
    onChangeInput(type, name, value);
  }

  const base = currencyType === 'BTC' ? 'USD' : 'BTC';

  const has = {
    from: wallet.get(base) || 0,
    to: wallet.get(currencyType) || 0
  };

  console.log(has);


  return (
    <div className={cx('trade-section')}>
      <TradeBox currencyType={currencyType}
        {...buy.toJS()} 
        onChange={onChangeFor('buy')} 
        hasAmount={has.from} 
        onRefreshPrice={onRefreshPrice}
      />
      <TradeBox 
        currencyType={currencyType} 
        sell 
        {...sell.toJS()} 
        onChange={onChangeFor('sell')} 
        hasAmount={has.to} 
        onRefreshPrice={onRefreshPrice}
      />      
    </div>
  );
};

export default TradeSection;