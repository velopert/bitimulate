import React, { Component } from 'react';
import { Header } from 'components';
// import redux dependencies
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as baseActions from 'store/modules/base';
import * as authActions from 'store/modules/auth';

class HeaderContainer extends Component {
  handleLoginButtonClick = () => {
    const { BaseActions, AuthActions } = this.props;
    BaseActions.setScreenMaskVisibility(true);
    AuthActions.toggleLoginModal();
    AuthActions.setModalMode('login');
  }

  render() {
    const { handleLoginButtonClick } = this;

    return (
      <Header 
        onLoginButtonClick={handleLoginButtonClick}
      />
    );
  }
}

export default connect(
    (state) => ({

    }),
    (dispatch) => ({
        BaseActions: bindActionCreators(baseActions, dispatch),
        AuthActions: bindActionCreators(authActions, dispatch)
    })
)(HeaderContainer);
