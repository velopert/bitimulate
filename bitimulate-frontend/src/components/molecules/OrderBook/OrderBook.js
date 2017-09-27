import React from 'react';
import styles from './OrderBook.scss';
import classNames from 'classnames/bind';
import { Card, OrdersTable } from 'components';

const cx = classNames.bind(styles);

const OrderBook = ({currencyType, orderBook}) => {
  return (
    <div className={cx('order-book')}>
      <div className={cx('column')}>
        <Card>
          <OrdersTable 
            type="매수" 
            currency={currencyType}
            data={orderBook.get('buy')}/>
        </Card>
      </div>
      <div className={cx('column')}>
        <Card>
          <OrdersTable
            type="매도" 
            currency={currencyType}
            data={orderBook.get('sell')}/>
        </Card>
      </div>
    </div>
  );
};

export default OrderBook;