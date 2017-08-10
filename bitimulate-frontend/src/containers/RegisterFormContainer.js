import React, { Component } from 'react';
import { RegisterForm } from 'components';
// import redux dependencies
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as registerActions from 'store/modules/register';

class RegisterFormContainer extends Component {

  handleChangeNickname = (e) => {
    const { value } = e.target;
    const { RegisterActions } = this.props;

    RegisterActions.changeNickname(value);
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
    const { nickname, currency, optionIndex } = this.props;
    console.log(nickname, currency, optionIndex);
  }

  render() {
    const { nickname, currency, optionIndex } = this.props;
    
    const {
      handleChangeNickname,
      handleSetCurrency,
      handleSelectOptionIndex,
      handleSubmit
    } = this;

    return (
      <RegisterForm
        nickname={nickname}
        currency={currency}
        optionIndex={optionIndex}
        onChangeNickname={handleChangeNickname}
        onSetCurrency={handleSetCurrency}
        onSelectOptionIndex={handleSelectOptionIndex}
        onSubmit={handleSubmit}
      />
    );
  }
}

export default connect(
    (state) => ({
      nickname: state.register.get('nickname'),
      currency: state.register.get('currency'),
      optionIndex: state.register.get('optionIndex')
    }),
    (dispatch) => ({
        RegisterActions: bindActionCreators(registerActions, dispatch)
    })
)(RegisterFormContainer);
