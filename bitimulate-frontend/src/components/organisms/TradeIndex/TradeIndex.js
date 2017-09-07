import React from 'react';
import styles from './TradeIndex.scss';
import classNames from 'classnames/bind';
import { RateInfoCard } from 'components';

const cx = classNames.bind(styles);

const TradeIndex = ({rate, pinMap, onTogglePin, showPinned}) => {
  let filtered = showPinned ? (
    rate.filter((info) => pinMap[info.get('currencyKey')])
  ) : rate;

  const rateInfoCardList = filtered.map(
    (info) => (
      <RateInfoCard 
        key={info.get('name')}
        currencyKey={info.get('currencyKey')}
        percentage={info.get('percentChange')}
        volume={info.get('baseVolume')}
        last={info.get('last')}
        currencyName={info.get('currencyName')}
        onTogglePin={() => onTogglePin(info.get('currencyKey'))}
        pinned={pinMap[info.get('currencyKey')]}
      />
    )
  )
  return (
    <div className={cx('trade-index')}>
      <div className={cx('inner')}>
        {rateInfoCardList}
      </div>
    </div>
  );
};

export default TradeIndex;