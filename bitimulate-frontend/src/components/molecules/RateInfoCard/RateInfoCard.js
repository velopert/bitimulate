import React from 'react';
import styles from './RateInfoCard.scss';
import classNames from 'classnames/bind';
import { HoverCard } from 'components';
import PinIcon from 'react-icons/lib/ti/pin';
import { getCurrency } from 'lib/utils';

const cx = classNames.bind(styles);

const RateInfoCard = ({currencyKey="ETH", last=4.7e-7, volume="125543", percentage="0.01", currencyName="Ethereum" }) => {

  if(!currencyName) return null;

  const parsedPercentage = Math.round(parseFloat(percentage) * 10000) / 100;
  const parsedVolume = Math.round(parseFloat(volume) * 100) / 100;
  const value = last.toFixed(9);

  return (
    <div className={cx('wrapper')}>
      <HoverCard className={cx('rate-info-card')}>
        <div className={cx('head')}>
          <div className={cx('short-name')}>{currencyKey}</div>
          <div className={cx('pin-wrapper')}><PinIcon/></div>
        </div>
        <div className={cx('percentage', { positive: parsedPercentage > 0, netural: parsedPercentage === 0 })}>({parsedPercentage.toFixed(2)}%)</div>
        <div className={cx('value')}>{value}</div>
        <div className={cx('name')}>{currencyName}</div>
        <div className={cx('volume')}>
          <b>볼륨 </b>
          <span>{parsedVolume}</span>
        </div>
      </HoverCard>
    </div>
  );
};

export default RateInfoCard;