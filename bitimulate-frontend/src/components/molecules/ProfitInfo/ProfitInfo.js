import React from 'react';
import styles from './ProfitInfo.scss';
import classNames from 'classnames/bind';
import { limitDigit } from 'lib/utils';

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

const ProfitInfo = ({initial, current, monthly}) => {
  if(!initial) return null;
  const { currency, value, usdRate } = initial.toJS();

  const initialUSD = currency === 'USD' ? value : value / usdRate;
  const { usdRate: mUSDRate, usdValue } = monthly.toJS();

  const diff = current.usd - initialUSD;
  const earnings = (diff / initialUSD * 100).toFixed(2);

  const monthlyDiff = current.usd - usdValue;
  const monthlyEarnings = (monthlyDiff / usdValue * 100).toFixed(2);

  return (
    <div className={cx('profit-info')}>
      <h2>자금 및 현재 자산</h2>
      <div className={cx('description')}>
        <ul>
          <li>USD를 기반으로 계산됩니다.</li>
          <li>월 수익률 랭킹 1위에겐 상금이 지급됩니다.</li>
        </ul>
      </div>
      <div className={cx('info')}>
        <InfoBox
          name="초기 자금">
          {
            (() => {
              if(currency === 'USD') {
                return (
                  <div>
                    <p>$ {value}</p>
                    <p><span className={cx('sign')}>≈</span> Ƀ{limitDigit(value * usdRate)}</p>
                  </div>
                )
              }

              return (
                <div>
                  <p>Ƀ {value}</p>
                  <p><span className={cx('sign')}>≈</span> ${limitDigit(value / usdRate, 10, true, true)}</p>
                </div>
              )
            })()
          }
        </InfoBox>
        <InfoBox
          name="이번 달 자산">
          <p>Ƀ {limitDigit(usdValue * mUSDRate, 10)}</p>
          <p>$ {limitDigit(usdValue, 10, true, true)}</p>
        </InfoBox>
        <InfoBox
          name="현재 자산">
          <p>Ƀ {limitDigit(current.btc, 10)}</p>
          <p>$ {limitDigit(current.usd, 10, true, true)}</p>
        </InfoBox>
      </div>
      <div className={cx('info')}>
        <InfoBox
          name="월 수익률">
          <div className={cx('percentage', monthlyDiff >= 0 ? 'positive' : 'negative')}>
            {monthlyDiff > 0 && '+'}{monthlyEarnings}%
          </div>
        </InfoBox>
        <InfoBox
        name="가입 후 수익률">
        <div className={cx('percentage', diff >= 0 ? 'positive' : 'negative')}>
          {diff > 0 && '+'}{earnings}%
        </div>
      </InfoBox>
    </div>
    </div>
  );
}

export default ProfitInfo;