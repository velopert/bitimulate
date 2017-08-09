import React from 'react';
import styles from './Paper.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const Paper = ({children}) => {
  return (
    <div className={cx('paper')}>
      {children}
    </div>
  );
};

export default Paper;