import React, { Component } from 'react';
// import redux dependencies
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { LoginModal } from 'components';
import onClickOutside from 'react-onclickoutside'
import * as baseActions from 'store/modules/base';
import * as authActions from 'store/modules/auth';
import validate from 'validate.js';


class LoginModalContainer extends Component {
  handleClickOutside = evt => {
    const { visible, BaseActions, AuthActions } = this.props;
    if(!visible) return;
    BaseActions.setScreenMaskVisibility(false);
    AuthActions.toggleLoginModal();
  }
  handleChangeMode = () => {
    const { mode, AuthActions } = this.props;
    const inverted = mode === 'login' ? 'register' : 'login';
    AuthActions.setModalMode(inverted);
  }
  handleChangeInput = (e) => {
    const { AuthActions } = this.props;
    const { name, value } = e.target;

    AuthActions.changeInput({
      name,
      value
    });
  }
  handleLogin = () => {
    console.log('뭐, 로그인해 ')
  }
  handleRegister = () => {
    // validate email and password
    const constraints = {
      email: {
        email: {
          message: () => '^잘못된 형식의 이메일입니다.'
        }
      },
      password: {
        length: { 
          minimum: 6,
          tooShort: '^비밀번호는 %{count}자 이상 입력하세요.'
        }
      }
    }

    const form = this.props.form.toJS();
    const error = validate(form, constraints);

    const { AuthActions } = this.props;
    if(error) {
      AuthActions.setError(error);
    }
  }
  render() {
    const { visible, mode, form, error } = this.props;
    const { 
      handleChangeMode, 
      handleChangeInput,
      handleLogin,
      handleRegister
    } = this;

    return (
      <LoginModal 
        visible={visible} 
        mode={mode} 
        forms={form} 
        error={error}
        onChangeInput={handleChangeInput}
        onChangeMode={handleChangeMode}
        onLogin={handleLogin}
        onRegister={handleRegister}/>
    );
  }
}

export default connect(
    (state) => ({
      visible: state.auth.getIn(['modal', 'visible']),
      mode: state.auth.getIn(['modal', 'mode']),
      form: state.auth.get('form'),
      error: state.auth.get('error')
    }),
    (dispatch) => ({
        BaseActions: bindActionCreators(baseActions, dispatch),
        AuthActions: bindActionCreators(authActions, dispatch)
    })
)(onClickOutside(LoginModalContainer));
