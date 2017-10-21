import React from 'react';
import styles from './WalletTable.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const Row = () => (
  <div className={cx('row')}>
    <div className={cx('col', 'coin')}>코인</div>
    <div className={cx('col', 'name')}>이름</div>
    <div className={cx('col', 'has')}>보유량</div>
    <div className={cx('col', 'waiting')}>거래 대기중</div>
    <div className={cx('col', 'btc')}>BTC 가치</div>
  </div>
)

const WalletTable = () => {
  return (
    <div className={cx('wallet-table')}>
      <div className={cx('table-head')}>
        <div className={cx('col', 'coin')}>코인</div>
        <div className={cx('col', 'name')}>이름</div>
        <div className={cx('col', 'has')}>보유량</div>
        <div className={cx('col', 'waiting')}>거래 대기중</div>
        <div className={cx('col', 'btc')}>BTC 가치</div>
      </div>
      <div className={cx('rows')}>
        <Row/>
        <Row/>
        <Row/>
        <Row/>
        <Row/>
        <Row/>
        <Row/>
      </div>
    </div>
  );
};

export default WalletTable;