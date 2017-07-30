import React from 'react';
import styles from './NavItem.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const NavItem = ({children}) => {
  return (
    <div className={cx('nav-item')}>
      {children}
    </div>
  );
};

export default NavItem;