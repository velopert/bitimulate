import React from 'react';
import styles from './TradeIndex.scss';
import classNames from 'classnames/bind';
import { HoverCard, RateInfoCard } from 'components';

const cx = classNames.bind(styles);

const TradeIndex = ({rate}) => {
  const rateInfoCardList = rate.map(
    (info) => (
      <RateInfoCard 
        key={info.get('name')}
        currencyKey={info.get('currencyKey')}
        percentage={info.get('percentChange')}
        volume={info.get('baseVolume')}
        last={info.get('last')}
        currencyName={info.get('currencyName')}
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