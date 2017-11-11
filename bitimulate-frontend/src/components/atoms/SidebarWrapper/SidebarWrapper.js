import React from 'react';
import styles from './SidebarWrapper.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const SidebarWrapper = ({children, visible}) => (
  <div className={cx('sidebar-wrapper', { hidden: !visible})}>
    {children}
  </div>
);

export default SidebarWrapper;