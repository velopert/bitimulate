import React from 'react';
import styles from './RateInfoCard.scss';
import classNames from 'classnames/bind';
import { HoverCard } from 'components';
import PinIcon from 'react-icons/lib/ti/pin';

const cx = classNames.bind(styles);

const RateInfoCard = ({shortName="BTC", name="Bitcoin", value="123123", volume="125543", percentage="0.01" }) => {

  const parsedPercentage = Math.round(parseFloat(percentage) * 10000) / 100;

  return (
    <div className={cx('wrapper')}>
      <HoverCard className={cx('rate-info-card')}>
        <div className={cx('head')}>
          <div className={cx('short-name')}>{shortName}</div>
          <div className={cx('pin-wrapper')}><PinIcon/></div>
        </div>
        <div className={cx('percentage', { positive: parsedPercentage > 0, netural: parsedPercentage === 0 })}>({parsedPercentage.toFixed(2)}%)</div>
        <div className={cx('value')}>{value}</div>
        <div className={cx('name')}>{name}</div>
        <div className={cx('volume')}>
          <b>볼륨</b>
          <span>{volume}</span>
        </div>
      </HoverCard>
    </div>
  );
};

export default RateInfoCard;