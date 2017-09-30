import React from 'react';
import styles from './Button.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const Button = ({
  children, 
  flex, 
  className, 
  roundCorner, 
  invert, 
  flat, 
  color,
  padding="0.5rem",
  xPadding,
  style,
  disabled,
  dark,
  ...rest
}) => {
  const dynamicStyle = {
    ...(xPadding ? {
      paddingLeft: xPadding,
      paddingRight: xPadding
    } : {})
  }
  return (
    <div className={
      cx('button', {
        invert,
        flex,
        flat,
        disabled,
        dark
      }, color, className)
    }
    style={{
      padding,
      ...style,
      ...dynamicStyle
    }}
     {...rest}>
      {children}
    </div>
  );
};

export default Button;