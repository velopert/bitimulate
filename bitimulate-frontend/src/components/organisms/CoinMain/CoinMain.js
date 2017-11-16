import React from 'react';
import styles from './CoinMain.scss';
import classNames from 'classnames/bind';
import { CoinBlock } from 'components';

const cx = classNames.bind(styles);

// const coinTypes = ['BTC', 'BCH', 'ETH', 'LTC', 'XRP', 'DASH', 'XMR']
const CoinMain = ({
  rate
}) => {
  const coinBlockList = rate.map(
    r => (<CoinBlock 
      key={r.get('currencyKey')} 
      currencyKey={r.get('currencyKey')}
      name={r.get('currencyName')}
      last={r.get('last')}
      percent={r.get('percentChange')}
    />)
  );

  return ( 
    <div className={cx('coin-main')}>
      {coinBlockList}
    </div>
  );
}

export default CoinMain;