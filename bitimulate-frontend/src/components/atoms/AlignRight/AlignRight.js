import React from 'react';
import styles from './AlignRight.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const AlignRight = ({children, className, ...rest}) => {
  return (
    <div className={cx('align-right', className)} {...rest}>
      <div className={cx('inner')}>
        {children}
      </div>
    </div>
  );
};

export default AlignRight;