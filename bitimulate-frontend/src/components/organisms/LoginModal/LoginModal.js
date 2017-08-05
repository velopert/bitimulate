import React from 'react';
import styles from './LoginModal.scss';
import classNames from 'classnames/bind';
import { Modal, Input, Button, TextButton, SocialLoginButton } from 'components';

const cx = classNames.bind(styles);

const LoginModal = ({visible}) => {
  return (
    <Modal visible={visible}>
      <div className={cx('login-modal')}>
        <div className={cx('bar')}></div>
        <div className={cx('content')}>
          <h3>이메일로 로그인</h3>
          <div className={cx('form')}>
            <Input fullWidth big placeholder="이메일"/>
            <Input fullWidth big placeholder="비밀번호" type="password"/>
          </div>
          <Button flat color="teal" flex padding="0.6rem" className={cx('login')}>로그인</Button>
          <div className={cx('login-foot')}>
            <TextButton>비밀번호 찾기</TextButton>
            <TextButton right>회원가입</TextButton>
          </div>
          <div className={cx('separator')}>
            <div className={cx('or')}>OR</div>
          </div>
          <h3>소셜 계정으로 로그인</h3>
          <SocialLoginButton/>
        </div>
      </div>
    </Modal>
  );
};

export default LoginModal;