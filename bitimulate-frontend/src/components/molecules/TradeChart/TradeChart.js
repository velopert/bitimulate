import React, { Component } from 'react';
import styles from './TradeChart.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

class TradeChart extends Component {
  render() {
    return (
      <div className={cx('trade-chart')}>
        Rain.
      </div>
    )
  }
}

export default TradeChart;