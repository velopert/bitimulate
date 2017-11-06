import React from 'react';
import styles from './Paper.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const Paper = ({children, className}) => {
  return (
    <div className={cx('paper', className)}>
      {children}
    </div>
  );
};

export default Paper;