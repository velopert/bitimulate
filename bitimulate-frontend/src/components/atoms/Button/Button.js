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
  onClick,
  theme,
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
        dark,
      }, color, className, theme)
    }
    style={{
      padding,
      ...style,
      ...dynamicStyle
    }}
    onClick={disabled ? undefined : onClick}
     {...rest}>
      {children}
    </div>
  );
};

export default Button;