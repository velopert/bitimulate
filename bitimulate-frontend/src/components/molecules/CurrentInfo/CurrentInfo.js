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

  console.log(info.toJS())

  return (
    <div className={cx('current-info')}>
      <div className={cx('')}></div>
      <LabelBlock label="업데이트 날짜">
        {moment(lastUpdate).format('YYYY MMM DD HH:mm')}
      </LabelBlock>
      <LabelBlock label="거래량 (24h)">
        {baseVolume}
      </LabelBlock>
      <LabelBlock label="현재가">
        {last.toFixed(10)}
      </LabelBlock>
      <LabelBlock label="최저가 (24h)">
        {low24hr.toFixed(10)}
      </LabelBlock>
      <LabelBlock label="최고가 (24h)">
        {high24hr.toFixed(10)}
      </LabelBlock>
      <LabelBlock label="매수호가">
        {lowestAsk.toFixed(10)}
      </LabelBlock>
      <LabelBlock label="매도호가">
        {highestBid.toFixed(10)}
      </LabelBlock>
    </div>
  );
};

export default CurrentInfo;