import React from 'react';
import styles from './SortReverser.scss';
import classNames from 'classnames/bind';
import AscIcon from 'react-icons/lib/fa/sort-amount-asc';
import DescIcon from 'react-icons/lib/fa/sort-amount-desc';

const cx = classNames.bind(styles);

const SortReverser = ({asc, onToggle}) => {
  return (
    <div className={cx('sort-reverser')} onClick={onToggle}>
      {asc ? <AscIcon/> : <DescIcon/>}
    </div>
  );
};

export default SortReverser;