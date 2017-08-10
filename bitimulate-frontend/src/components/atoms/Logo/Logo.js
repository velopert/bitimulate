import React from 'react';
import styles from './Logo.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const Logo = () => {
  return (
    <Link to="/" className={cx('logo')}>
      bitimulate
    </Link>
  );
};

export default Logo;