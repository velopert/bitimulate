import React from 'react';
import styles from './TradeIndexSubpage.scss';
import classNames from 'classnames/bind';
import { TradeIndexContainer, TradeIndexOptionsContainer } from 'containers';
import { Helmet } from 'react-helmet';

const cx = classNames.bind(styles);

const TradeIndexSubpage = () => {
  return (
    <div className={cx('trade-index-subpage')}>
      <Helmet>
        <title>거래소 :: Bitimulate</title>
        <meta name="description" content="가상화폐 종합 시세 확인하기"/>
      </Helmet>
      <TradeIndexOptionsContainer/>
      <TradeIndexContainer/>
    </div>
  );
};

export default TradeIndexSubpage;