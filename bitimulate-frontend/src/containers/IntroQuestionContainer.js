import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as baseActions from 'store/modules/base';
import * as authActions from 'store/modules/auth';
import { IntroQuestion } from 'components';

class IntroQuestionContainer extends Component {
  handleClick = () => {
    const { BaseActions, AuthActions } = this.props;
    AuthActions.toggleLoginModal();
    BaseActions.setScreenMaskVisibility(true);
    AuthActions.setModalMode('register');
  }
  render() {
    const { handleClick } = this;
    return (
      <IntroQuestion onClick={handleClick}/>
    )
  }
}

export default connect(
  (state) => ({}),
  (dispatch) => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
    AuthActions: bindActionCreators(authActions, dispatch)
  })
)(IntroQuestionContainer);