import React from 'react';
import styles from './ProfitInfo.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const InfoBox = ({name, children}) => (
  <div className={cx('info-box')}>
    <h4>
      {name}
    </h4>
    <div className={cx('content')}>
      { children }
    </div>
  </div>
)

const ProfitInfo = () => (
  <div className={cx('profit-info')}>
    <h2>초기 자금 및 현재 자산</h2>
    <div className={cx('description')}>
      수익률은 USD를 기반으로 계산됩니다.
    </div>
    <div className={cx('info')}>
      <InfoBox
        name="초기 자금">
        <p>100 BTC</p>
        <p><span className={cx('sign')}>≈</span> 100,000 USD</p>
      </InfoBox>
      <InfoBox
        name="현재 자산">
        <p>100 BTC</p>
        <p><span className={cx('sign')}>≈</span> 100,000 USD</p>
      </InfoBox>
      <InfoBox
        name="수익률">
        <div className={cx('percentage', 'positive')}>
          +15.23%
        </div>
      </InfoBox>
      
    </div>
  </div>
);

export default ProfitInfo;