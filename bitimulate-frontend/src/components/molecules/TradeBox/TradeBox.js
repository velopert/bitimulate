import React from 'react';
import styles from './TradeBox.scss';
import classNames from 'classnames/bind';
import { Card, HorizontalLabelInput, Button } from 'components';
import { limitDigit } from 'lib/utils';


const cx = classNames.bind(styles);

const TradeBox = ({
  title, 
  hasAmount, 
  currencyType, 
  price, 
  amount,
  sell,
  onChange,
  onRefreshPrice,
  onCreateOrder,
  disabled
}) => {

  const actionText = sell ? '매도' : '매수';
  const secondaryCurrency = currencyType === 'BTC' ? 'USD' : 'BTC';
  
  const onCalculate = () => {
    onChange({
      target: {
        name: 'amount',
        value: sell ? hasAmount : parseFloat(hasAmount) / parseFloat(price)
      }
    });
  }

  const inputSetting = {
    type: 'number',
    min: '0',
    inputMode: 'numeric',
  };

  return (
    <Card className={cx('trade-box')}>
      <div className={cx('head')}>
        <div className={cx('title')}>{currencyType} {actionText}</div>
        <div className={cx('has-amount')}><span className={cx('desc')}>보유량:</span> {limitDigit(hasAmount, 8)} <span className={cx('currency')}>{ sell ? currencyType : secondaryCurrency }</span></div>
      </div>
      <div className={cx('content')}>
        <div className={cx('text-buttons')}>
          <div className={cx('text-button')} onClick={() => onRefreshPrice(sell ? 'sell' : 'buy')}>가격 새로고침</div>
          <div className={cx('text-button')} onClick={onCalculate}>최고 {actionText}량 계산</div>
        </div>
        <HorizontalLabelInput 
          {...inputSetting} 
          label="가격" 
          currency={secondaryCurrency} 
          value={price} 
          onChange={onChange}
          name="price"
        />
        <HorizontalLabelInput 
          {...inputSetting} 
          label={actionText + '량'} 
          currency={currencyType} 
          value={amount} 
          onChange={onChange}
          name="amount"
        />
      </div>
      <div className={cx('content', 'bright')}>
        <div className={cx('text')}>총 {actionText} 가격</div>
        <div className={cx('total')}>
          {
            limitDigit(parseFloat(price) * parseFloat(amount))
          }
           <span className={cx('base')}>{secondaryCurrency}</span>
        </div>
      </div>
      <div className={cx('content', 'bright', 'bottom')}>
        <Button flat color="teal" flex onClick={onCreateOrder} disabled={disabled}>{actionText}</Button>
      </div>
    </Card>
  );
};

TradeBox.defaultProps = {
  title: '타이틀',
  hasAmount: 100,
  base: 'BTC',
  currencyType: 'ETH',
  price: 100,
  amount: 100
}

export default TradeBox;