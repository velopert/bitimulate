import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as baseActions from 'store/modules/base';
import * as authActions from 'store/modules/auth';
import { IntroQuestion } from 'components';
import { withRouter } from 'react-router-dom';


class IntroQuestionContainer extends Component {
  handleClick = () => {
    const { BaseActions, AuthActions, history, user } = this.props;

    if (user) {
      history.push('/trade');
      return;
    }

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
  (state) => ({
    user: state.user.get('user')
  }),
  (dispatch) => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
    AuthActions: bindActionCreators(authActions, dispatch)
  })
)(withRouter(IntroQuestionContainer));