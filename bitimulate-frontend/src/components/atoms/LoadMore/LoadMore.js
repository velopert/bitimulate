import React from 'react';
import styles from './LoadMore.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const LoadMore = ({onClick}) => (
  <div className={cx('load-more')} onClick={onClick}>
    더 보기
  </div>
);

export default LoadMore;