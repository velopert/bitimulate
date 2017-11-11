import React from 'react';
import styles from './Hamburger.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const Hamburger = ({active, onToggle}) => (
  <div className={cx('hamburger-wrapper')} onClick={onToggle}>
    <div className={classNames("hamburger hamburger--elastic", { 'is-active': active})}>
      <span className="hamburger-box">
        <span className="hamburger-inner"></span>
      </span>
    </div>
  </div>
);

export default Hamburger;