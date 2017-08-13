import React from 'react';
import styles from './InputError.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const InputError = ({children, error, noMarginTop, ...rest}) => {
  if(!error) return null;
  return (
    <div className={cx('input-error', { 'no-margin-top': noMarginTop })} {...rest}>
      {error}
    </div>
  );
};

export default InputError;