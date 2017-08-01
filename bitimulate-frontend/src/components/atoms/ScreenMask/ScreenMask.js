import React from 'react';
import styles from './ScreenMask.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const ScreenMask = ({visible}) => {
  return (
    <div className={cx('screen-mask')}>
      Hi...
    </div>
  );
};

export default ScreenMask;