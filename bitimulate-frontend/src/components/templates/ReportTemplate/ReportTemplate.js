import React from 'react';
import styles from './ReportTemplate.scss';
import classNames from 'classnames/bind';
import { ResponsiveAd } from 'components';

const cx = classNames.bind(styles);

const ReportTemplate = ({tradeHistory, wallet}) => (
  <div className={cx('report-template')}>
    <div className={cx('wallet')}>{wallet}</div>
    <div className={cx('ads-area')}>
     <ResponsiveAd/>
    </div>
    <div className={cx('trade-history')}>
    <h2>거래내역</h2>
    {tradeHistory}
    </div>
  </div>
);

export default ReportTemplate;