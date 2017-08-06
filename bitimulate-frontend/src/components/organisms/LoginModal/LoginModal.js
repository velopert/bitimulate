import React from 'react';
import styles from './LoginModal.scss';
import classNames from 'classnames/bind';
import { Modal, Input, Button, TextButton, SocialLoginButton, InputError } from 'components';
const cx = classNames.bind(styles);

const LoginModal = ({
  visible, 
  mode, 
  forms,
  error,
  onChangeInput,
  onChangeMode,
  onLogin,
  onRegister
}) => {
  const isLogin = mode === 'login';
  const modeText = isLogin ? '로그인' : '회원가입';
  const invertedText = isLogin ? '회원가입' : '로그인';
  
  const {
    email,
    password,
  } = forms.toJS();

  const {
    email: emailError,
    password: passwordError
  } = error ? error.toJS() : { };

  const onButtonClick = isLogin ? onLogin : onRegister;

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
              <InputError error={emailError}/>
            <Input 
              value={password}
              onChange={onChangeInput}
              name="password" 
              fullWidth big 
              placeholder="비밀번호" 
              type="password"/>
              <InputError error={passwordError}/>
          </div>
          <Button 
            flat color="teal" 
            flex padding="0.6rem" 
            className={cx('login')}
            onClick={onButtonClick}>{modeText}</Button>
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