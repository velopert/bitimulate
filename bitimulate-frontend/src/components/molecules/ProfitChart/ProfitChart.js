import React from 'react';
import styles from './ProfitChart.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const ProfitChart = () => (
  <div>
    <h2>수익률 차트</h2>
    <div className={cx('not-available')}>
      현재 준비중입니다 :-)
    </div>
  </div>
);

export default ProfitChart;