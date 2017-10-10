import React from 'react';
import styles from './PublicTradeHistory.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

// // date | type | price | amount
const PublicTradeHistory = () => {
  return (
    <div className={cx('public-trade-history')}>
      <div className={cx('title')}>
        거래내역
      </div>
      <div className={cx('head')}>
        <div className={cx('col', 'time')}>
          시간
        </div>
        <div className={cx('col', 'type')}>
          종류
        </div>
        <div className={cx('col')}>
          가격
        </div>
        <div className={cx('col')}>
          거래량
        </div>
      </div>
      <div className={cx('rows')}>
        <div className={cx('row')}>
          <div className={cx('col', 'time')}>
            시간
          </div>
          <div className={cx('col', 'type')}>
            종류
          </div>
          <div className={cx('col')}>
            가격
          </div>
          <div className={cx('col')}>
            거래량
          </div>
        </div>
        <div className={cx('row')}>ㅇ</div>
        <div className={cx('row')}>ㅇ</div>
        <div className={cx('row')}>ㅇ</div>
        <div className={cx('row')}>ㅇ</div>
        <div className={cx('row')}>ㅇ</div>
        <div className={cx('row')}>ㅇ</div>
        <div className={cx('row')}>ㅇ</div>
        <div className={cx('row')}>ㅇ</div>
        <div className={cx('row')}>ㅇ</div>
        <div className={cx('row')}>ㅇ</div>
        <div className={cx('row')}>ㅇ</div>
        <div className={cx('row')}>ㅇ</div>
        <div className={cx('row')}>ㅇ</div>
      </div>

    </div>
  );
};

export default PublicTradeHistory;