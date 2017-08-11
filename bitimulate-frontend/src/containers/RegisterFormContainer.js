import React, { Component } from 'react';
import { RegisterForm } from 'components';
// import redux dependencies
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as registerActions from 'store/modules/register';
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

  handleSubmit = () => {
    const { nickname, currency, optionIndex, authForm, RegisterActions } = this.props;
    const { email, password } = authForm.toJS();

    RegisterActions.submit({
      displayName: nickname,
      email,
      password,
      initialMoney: {
        currency,
        index: optionIndex
      }
    });
  }

  render() {
    const { nickname, currency, optionIndex, displayNameExists } = this.props;
    
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
      displayNameExists: state.register.get('displayNameExists')
    }),
    (dispatch) => ({
        RegisterActions: bindActionCreators(registerActions, dispatch)
    })
)(withRouter(RegisterFormContainer));
