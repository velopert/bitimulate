import React from 'react';
import styles from './TradeIndex.scss';
import classNames from 'classnames/bind';
import { RateInfoCard, BitcoinInfoCard } from 'components';

const cx = classNames.bind(styles);

const TradeIndex = ({rate, pinMap, onTogglePin, showPinned, krwRate}) => {
  let filtered = showPinned ? (
    rate.filter((info) => pinMap[info.get('currencyKey')])
  ) : rate;
  const btcInfo = rate.find(info => info.get('currencyName') === 'Bitcoin');


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
        info={info}
      />
    )
  )
  return (
    <div className={cx('trade-index')}>
      <div className={cx('inner')}>
      { btcInfo && (
        <BitcoinInfoCard 
          percentage={btcInfo.get('percentChange')}
          last={btcInfo.get('last')}
          info={btcInfo}
          krwRate={krwRate}
        />
      ) }
        {rateInfoCardList}
      </div>
    </div>
  );
};

export default TradeIndex;