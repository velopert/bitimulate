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
  onCreateOrder,
  wallet,
  disableButton
}) => {

  const onChangeFor = (type) => (e) => {
    const { name, value } = e.target;
    onChangeInput(type, name, value);
  }

  const base = currencyType === 'BTC' ? 'USD' : 'BTC';
  const currencyPair = currencyType === 'BTC' ? 'USDT_BTC' : `BTC_${currencyType}`;

  const has = {
    from: wallet.get(base) || 0,
    to: wallet.get(currencyType) || 0
  };

  return (
    <div className={cx('trade-section')}>
      <TradeBox currencyType={currencyType}
        {...buy.toJS()} 
        onChange={onChangeFor('buy')} 
        hasAmount={has.from} 
        onRefreshPrice={onRefreshPrice}
        onCreateOrder={() => {
          onCreateOrder({
            currencyPair,
            ...buy.toJS(),
            sell: false
          });
        }}
        disabled={disableButton.get('buy')}
      />
      <TradeBox 
        currencyType={currencyType} 
        sell 
        {...sell.toJS()} 
        onChange={onChangeFor('sell')} 
        hasAmount={has.to} 
        onRefreshPrice={onRefreshPrice}
        onCreateOrder={() => {
          onCreateOrder({
            currencyPair,
            ...sell.toJS(),
            sell: true
          });
        }}
        disabled={disableButton.get('sell')}
      />      
    </div>
  );
};

export default TradeSection;