import React from 'react';
import styles from './CurrentInfo.scss';
import classNames from 'classnames/bind';
import { LabelBlock } from 'components';
import moment from 'moment';
const cx = classNames.bind(styles);

const CurrentInfo = ({info}) => {
  const { 
    lastUpdate,
    last,
    low24hr,
    high24hr,
    highestBid,
    lowestAsk,
    baseVolume
  } = info.toJS();

  function limitDigit(value) {
    const digits = (10 - Math.round(Math.log10(value)));
    const fixed = value.toFixed(digits > 10 ? 10 : digits);
    const float = parseFloat(fixed)
    if(float > 1000) {
      return float.toLocaleString();
    }
    return fixed;
  }
  
  return (
    <div className={cx('current-info')}>
      <div className={cx('')}></div>
      <LabelBlock label="업데이트 날짜">
        {moment(lastUpdate).format('YYYY MMM DD HH:mm')}
      </LabelBlock>
      <LabelBlock label="거래량 (24h)">
        {limitDigit(baseVolume)}
      </LabelBlock>
      <LabelBlock label="현재가">
        {limitDigit(last)}
      </LabelBlock>
      <LabelBlock label="최저가 (24h)">
        {limitDigit(low24hr)}
      </LabelBlock>
      <LabelBlock label="최고가 (24h)">
        {limitDigit(high24hr)}
      </LabelBlock>
      <LabelBlock label="매수호가">
        {limitDigit(lowestAsk)}
      </LabelBlock>
      <LabelBlock label="매도호가">
        {limitDigit(highestBid)}
      </LabelBlock>
    </div>
  );
};

export default CurrentInfo;