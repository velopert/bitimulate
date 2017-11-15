import React from 'react';
import styles from './CoinBlock.scss';
import classNames from 'classnames/bind';
import { CoinIcon, Card } from 'components';

const cx = classNames.bind(styles);

const CoinBlock = () => (
  <div className={cx('coin-block-wrapper')}>
    <Card className={cx('coin-block')}>
      <div className={cx('icon-wrapper')}>
        <CoinIcon type="BTC"/>
      </div>
      <div className={cx('coin-name')}>
        BTC
      </div>
      <div className={cx('price-info')}>
        <div className={cx('description')}>현재 시세</div>
        <div className={cx('value')}>100 BTC</div>
      </div>
    </Card>
  </div>
);

export default CoinBlock;