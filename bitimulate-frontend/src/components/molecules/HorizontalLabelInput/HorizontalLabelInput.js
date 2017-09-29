import React from 'react';
import styles from './HorizontalLabelInput.scss';
import classNames from 'classnames/bind';
import { Input } from 'components';
const cx = classNames.bind(styles);

const HorizontalLabelInput = ({label, currency}) => {
  return (
    <div className={cx('horizontal-label-input')}>
      <label>
        {label}
      </label>
      <Input/>
      { currency && <div className={cx('currency')}>{currency}</div>}
    </div>
  );
};

export default HorizontalLabelInput;