import React from 'react';
import styles from './HeaderNav.scss';
import classNames from 'classnames/bind';
import { FlexBox, NavItem } from 'components';

const cx = classNames.bind(styles);

const HeaderNav = () => {
  return (
    <FlexBox row
      className={cx('header-nav')}>
      <NavItem to="/trade">
        거래소
      </NavItem>
      <NavItem>
        대시보드
      </NavItem>
      <NavItem>
        커뮤니티
      </NavItem>
    </FlexBox>
  );
};

export default HeaderNav;