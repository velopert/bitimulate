import React from 'react';
import styles from './LoginModal.scss';
import classNames from 'classnames/bind';
import { Modal, Input, Button, TextButton, SocialLoginButton } from 'components';

const cx = classNames.bind(styles);

const LoginModal = ({
  visible, 
  mode, 
  forms,
  onChangeInput,
  onChangeMode
}) => {
  const modeText = mode === 'login' ? '로그인' : '회원가입';
  const invertedText = mode === 'login' ? '회원가입' : '로그인';
  
  const {
    email,
    password,
    displayName
  } = forms.get(mode).toJS();

  return (
    <Modal visible={visible}>
      <div className={cx('login-modal')}>
        <div className={cx('bar')}></div>
        <div className={cx('content')}>
          <h3>이메일로 {modeText}</h3>
          <div className={cx('form')}>
            <Input 
              value={email}
              onChange={onChangeInput}
              name="email" 
              fullWidth big 
              placeholder="이메일"/>
            <Input 
              value={password}
              onChange={onChangeInput}
              name="password" 
              fullWidth big 
              placeholder="비밀번호" 
              type="password"/>
            { mode === 'register' && (
              <Input 
                value={displayName}
                onChange={onChangeInput}
                name="displayName" 
                fullWidth big 
                placeholder="닉네임"/> 
            )}
          </div>
          <Button flat color="teal" flex padding="0.6rem" className={cx('login')}>{modeText}</Button>
          <div className={cx('login-foot')}>
            <TextButton>비밀번호 찾기</TextButton>
            <TextButton right onClick={onChangeMode}>{invertedText}</TextButton>
          </div>
          <div className={cx('separator')}>
            <div className={cx('or')}>OR</div>
          </div>
          <h3>소셜 계정으로 {modeText}</h3>
          <SocialLoginButton/>
        </div>
      </div>
    </Modal>
  );
};

export default LoginModal;