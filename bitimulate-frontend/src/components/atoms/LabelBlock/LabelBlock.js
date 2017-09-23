import React from 'react';
import styles from './LabelBlock.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const LabelBlock = ({label, children}) => {
  return (
    <div className={cx('label-block')}>
      <div className={cx('label')}>{label}</div>
      <div className={cx('content')}>
        {children}
      </div>
    </div>
  );
};

export default LabelBlock;