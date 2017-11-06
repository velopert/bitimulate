import React from 'react';
import styles from './SpinnerBlock.scss';
import classNames from 'classnames/bind';
import { Spinner } from 'components';

const cx = classNames.bind(styles);

const SpinnerBlock = () => (
  <div className={cx('spinner-block')}>
    <Spinner/>
  </div>
);

export default SpinnerBlock;