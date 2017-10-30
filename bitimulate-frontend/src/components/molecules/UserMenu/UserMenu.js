import React from 'react';
import styles from './UserMenu.scss';
import classNames from 'classnames/bind';
import { Card } from 'components';

const cx = classNames.bind(styles);
// 클래스형태로 바꾸기
const UserMenu = () => (
  <div className={cx('user-menu')}>
    <Card className={cx('card', 'enter')} noPadding>
      <div className={cx('menu-item')}>로그아웃</div>
    </Card>
  </div>
);

export default UserMenu;