import React from 'react';
import styles from './Header.scss';
import classNames from 'classnames/bind';
import { Logo, HeaderNav, Button, UserButton, UserMenu } from 'components';

const cx = classNames.bind(styles);

const Header = ({
  onLoginButtonClick,
  user,
  solid
}) => {
  return (
    <div className={cx('header', { solid })}>
      <div className={cx('responsive')}>
        <div className={cx('logo-wrapper')}>
          <Logo/>
        </div>
        <div className={cx('right-side')}>
          <HeaderNav/>
          {
            user ? (
              <UserButton displayName={user.get('displayName')}/>
            ) : (
              <Button 
                invert 
                className={cx('login-button')}
                onClick={onLoginButtonClick}>
                로그인
              </Button>
            )
          }
        </div>
        <UserMenu/>
      </div>
    </div>
  );
};

export default Header;