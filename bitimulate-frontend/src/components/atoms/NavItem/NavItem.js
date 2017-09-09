import React from 'react';
import styles from './NavItem.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const NavItem = ({children, to}) => {
  if(to) {
    return (
      <Link className={cx('nav-item')} to={to}>{children}</Link>
    )
  }
  return (
    <div className={cx('nav-item')}>
      {children}
    </div>
  );
};

export default NavItem;