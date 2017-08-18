import React, { Component } from 'react';
import { RegisterForm } from 'components';
// import redux dependencies
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as registerActions from 'store/modules/register';
import * as userActions from 'store/modules/user';
import debounce from 'lodash/debounce';
import { withRouter } from 'react-router';

class RegisterFormContainer extends Component {

  handleChangeNickname = (e) => {
    const { value } = e.target;
    const { RegisterActions } = this.props;

    RegisterActions.changeNickname(value);
    this.checkDisplayName(value);
  }

  checkDisplayName = debounce((value) => {
    const { RegisterActions } = this.props;
    RegisterActions.checkDisplayName(value);
  }, 500)

  handleNicknameBlur = () => {
    const { nickname, RegisterActions } = this.props;
    RegisterActions.checkDisplayName(nickname);
  }

  handleSetCurrency = (currency) => {
    const { RegisterActions } = this.props;
    RegisterActions.setCurrency(currency);
  }

  handleSelectOptionIndex = (index) => {
    const { RegisterActions } = this.props;
    RegisterActions.selectOptionIndex(index);
  }

  handleSubmit = async () => {
    const { socialInfo, nickname, currency, optionIndex, authForm, history, RegisterActions, UserActions } = this.props;

    if(nickname.length < 1) {
      RegisterActions.setError('닉네임을 입력하세요')
      return;
    }

    // social register
    if(socialInfo) {
      const { accessToken, provider } = socialInfo.toJS();

      await RegisterActions.socialRegister({
        displayName: nickname,
        provider,
        accessToken,
        initialMoney: {
          currency,
          index: optionIndex
        }
      });
      
      const { result } = this.props;
      UserActions.setUser(result);
      history.push('/');
      
      return;
    }

    // local register

    const { email, password } = authForm.toJS();
    
    try {
      await RegisterActions.submit({
        displayName: nickname,
        email,
        password,
        initialMoney: {
          currency,
          index: optionIndex
        }
      });
      const { result } = this.props;
      UserActions.setUser(result);
      history.push('/');
    } catch (e) {
      console.log(e);
    }

  }

  render() {
    const { nickname, currency, optionIndex, displayNameExists, error } = this.props;
    
    const {
      handleChangeNickname,
      handleNicknameBlur,
      handleSetCurrency,
      handleSelectOptionIndex,
      handleSubmit
    } = this;

    return (
      <RegisterForm
        nickname={nickname}
        currency={currency}
        optionIndex={optionIndex}
        displayNameExists={displayNameExists}
        error={error}
        onChangeNickname={handleChangeNickname}
        onSetCurrency={handleSetCurrency}
        onSelectOptionIndex={handleSelectOptionIndex}
        onSubmit={handleSubmit}
        onNicknameBlur={handleNicknameBlur}
      />
    );
  }
}

export default connect(
    (state) => ({
      authForm: state.auth.get('form'),
      nickname: state.register.get('nickname'),
      currency: state.register.get('currency'),
      optionIndex: state.register.get('optionIndex'),
      displayNameExists: state.register.get('displayNameExists'),
      error: state.register.get('error'),
      result: state.register.get('result'),
      socialInfo: state.auth.get('socialInfo')
    }),
    (dispatch) => ({
        RegisterActions: bindActionCreators(registerActions, dispatch),
        UserActions: bindActionCreators(userActions, dispatch)
    })
)(withRouter(RegisterFormContainer));
