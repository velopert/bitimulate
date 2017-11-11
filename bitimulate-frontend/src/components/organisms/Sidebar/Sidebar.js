import React from 'react';
import styles from './Sidebar.scss';
import classNames from 'classnames/bind';
import { SidebarWrapper } from 'components';

const cx = classNames.bind(styles);

const Sidebar = ({visible}) => (
  <SidebarWrapper visible={visible}>

  </SidebarWrapper>
);

export default Sidebar;