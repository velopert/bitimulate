import React from 'react';
import styles from './HeaderNav.scss';
import classNames from 'classnames/bind';
import { FlexBox, NavItem } from 'components';

const cx = classNames.bind(styles);

const HeaderNav = ({logged}) => {
  return (
    <FlexBox row
      className={cx('header-nav')}>
      <NavItem to="/trade">
        거래소
      </NavItem>
      {logged && <NavItem to="/wallet">
        내 지갑
      </NavItem> }
      <NavItem to="/ranking">
        랭킹
      </NavItem>
    </FlexBox>
  );
};

export default HeaderNav;