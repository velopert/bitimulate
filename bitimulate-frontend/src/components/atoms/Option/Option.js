import React from 'react';
import styles from './Option.scss';
import classNames from 'classnames/bind';
import BlankIcon from 'react-icons/lib/md/check-box-outline-blank';
import CheckBoxIcon from 'react-icons/lib/md/check-box';

const cx = classNames.bind(styles);

const Option = ({children, active, onClick}) => {
  return (
    <div className={cx('option', {
      active
    })} onClick={onClick}>
      <div className={cx('check-box')}>
        <BlankIcon className={cx('blank')}/>
        <CheckBoxIcon className={cx('checked')}/>
      </div>
      <div className={cx('text')}>{children}</div>
    </div>
  );
};

export default Option;