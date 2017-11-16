import React from 'react';
import styles from './CoinBlock.scss';
import classNames from 'classnames/bind';
import { CoinIcon, Card } from 'components';
import { limitDigit, decimalToPercentString } from 'lib/utils';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const CoinBlock = ({currencyKey, name , last, percent}) => (
  <Link to={`/trade/${currencyKey}`} className={cx('coin-block-wrapper')}>
    <Card className={cx('coin-block')}>
      <div className={cx('icon-wrapper')}>
        <CoinIcon type={currencyKey}/>
      </div>
      <div className={cx('coin-name')}>
        {name}
      </div>
      <div className={cx('price-info')}>
        <div className={cx('description')}>
          현재 시세
          <span className={cx({ negative: percent < 0 })}>({decimalToPercentString(percent)}%)</span>
        </div>
        <div className={cx('value')}>{limitDigit(last)} {currencyKey === 'BTC' ? 'USD' : 'BTC'}</div>
      </div>
    </Card>
  </Link>
);

export default CoinBlock;