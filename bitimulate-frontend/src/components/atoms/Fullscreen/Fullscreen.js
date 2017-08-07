import React from 'react';
import styles from './Fullscreen.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const Fullscreen = ({className, ...rest}) => {
  return (
    <div className={cx('fullscreen', className)} {...rest}>
      
    </div>
  );
};

export default Fullscreen;