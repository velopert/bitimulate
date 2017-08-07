import React, { Component } from 'react';
// import redux dependencies
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { LoginModal } from 'components';
import onClickOutside from 'react-onclickoutside'
import * as baseActions from 'store/modules/base';
import * as authActions from 'store/modules/auth';
import * as registerActions from 'store/modules/register';

import validate from 'validate.js';


class LoginModalContainer extends Component {

  handleClose = () => {
    const { visible, BaseActions, AuthActions } = this.props;
    if(!visible) return;
    BaseActions.setScreenMaskVisibility(false);
    AuthActions.toggleLoginModal();
  }

  handleClickOutside = evt => {
    this.handleClose()
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
  handleRegister = async () => {
    const { AuthActions, RegisterActions } = this.props;
    // reset error
    AuthActions.setError(null);

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

    if(error) {
      return AuthActions.setError(error);
    }

    try {
      await AuthActions.checkEmail(form.email);
    } catch (e) {
      if(this.props.error) {
        return;
      }
    }

    // close the modal, open the register screen
    this.handleClose();

    RegisterActions.show();
    
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
        AuthActions: bindActionCreators(authActions, dispatch),
        RegisterActions: bindActionCreators(registerActions, dispatch)
    })
)(onClickOutside(LoginModalContainer));
