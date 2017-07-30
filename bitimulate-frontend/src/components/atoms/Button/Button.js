import React from 'react';
import styles from './Button.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const Button = ({children, className, roundCorner, invert}) => {
  return (
    <div className={
      cx('button', {
        invert
      }, className)
    }>
      {children}
    </div>
  );
};

export default Button;