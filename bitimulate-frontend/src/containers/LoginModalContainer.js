import React, { Component } from 'react';
// import redux dependencies
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { LoginModal, DimmerSpinner } from 'components';
import onClickOutside from 'react-onclickoutside'
import * as baseActions from 'store/modules/base';
import * as authActions from 'store/modules/auth';
import * as registerActions from 'store/modules/register';
import * as userActions from 'store/modules/user';
import storage from 'lib/storage';

import validate from 'validate.js';

import { withRouter } from 'react-router'



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

  handleLogin = async () => {
    const { AuthActions, UserActions, form } = this.props;
    const { email, password } = form.toJS();

    try {
      await AuthActions.localLogin({
        email, password
      });
      const { loginResult } = this.props;
      storage.set('__BTM_USER__', loginResult);
      UserActions.setUser(loginResult);
      AuthActions.setError(null);
      this.handleClose();
    } catch (e) {
      console.log(e);
    }
  }

  handleRegister = async () => {
    const { AuthActions } = this.props;
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
      if(this.props.error) {
        return;
      }
    } catch (e) {
      return;
    }

    // close the modal, open the register screen
    this.handleClose();
    const { history } = this.props;
    setTimeout(() => {
      history.push('/register');
    }, 400)
  }

  handleSocialLogin = async (provider) => {
    const { AuthActions, UserActions } = this.props;

    try {
      await AuthActions.providerLogin(provider);

      const { socialInfo } = this.props;

      await AuthActions.socialLogin({
        provider,
        accessToken: socialInfo.get('accessToken')
      });

      const { redirectToRegister } = this.props;
      
      if(redirectToRegister) {
        this.handleClose();
        const { history } = this.props;
        setTimeout(() => {
          history.push('/register');
        }, 400);
        return;
      }

      const { loginResult } = this.props;
      storage.set('__BTM_USER__', loginResult);
      UserActions.setUser(loginResult);
      AuthActions.setError(null);
      this.handleClose();

    } catch (e) {
      return;
    }

    
  }
  render() {
    const { visible, mode, form, error, pending } = this.props;
    const { 
      handleChangeMode, 
      handleChangeInput,
      handleLogin,
      handleRegister,
      handleSocialLogin,
      handleClose
    } = this;

    return (
      <div>
        <LoginModal 
          visible={visible} 
          mode={mode} 
          forms={form} 
          error={error}
          onChangeInput={handleChangeInput}
          onChangeMode={handleChangeMode}
          onLogin={handleLogin}
          onRegister={handleRegister}
          onSocialLogin={handleSocialLogin}
          onClose={handleClose}
        />
        <DimmerSpinner visible={pending}/>
      </div>
    );
  }
}

export default connect(
    (state) => ({
      visible: state.auth.getIn(['modal', 'visible']),
      mode: state.auth.getIn(['modal', 'mode']),
      form: state.auth.get('form'),
      error: state.auth.get('error'),
      loginResult: state.auth.get('loginResult'),
      socialInfo: state.auth.get('socialInfo'),
      redirectToRegister: state.auth.get('redirectToRegister'),
      pending: state.pender.pending['LOCAL_LOGIN'] || state.pender.pending['auth/SOCIAL_LOGIN'] || state.pender.pending['auth/PROVIDER_LOGIN']
    }),
    (dispatch) => ({
        BaseActions: bindActionCreators(baseActions, dispatch),
        AuthActions: bindActionCreators(authActions, dispatch),
        RegisterActions: bindActionCreators(registerActions, dispatch),
        UserActions: bindActionCreators(userActions, dispatch)
    })
)(withRouter(onClickOutside(LoginModalContainer)));