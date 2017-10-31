import React, { Component } from 'react';
import { Header } from 'components';
// import redux dependencies
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as baseActions from 'store/modules/base';
import * as authActions from 'store/modules/auth';

import storage from 'lib/storage';

class HeaderContainer extends Component {

  handleShowUserMenu = () => {
    const { BaseActions } = this.props;
    BaseActions.showUserMenu();
  }

  handleHideUserMenu = () => {
    const { BaseActions } = this.props;
    BaseActions.hideUserMenu();
  }

  handleLoginButtonClick = () => {
    const { BaseActions, AuthActions } = this.props;
    BaseActions.setScreenMaskVisibility(true);
    AuthActions.toggleLoginModal();
    AuthActions.setModalMode('login');
  }

  handleLogout = async () => {
    const { AuthActions } = this.props;
    try {
      await AuthActions.logout();
      storage.remove('__BTM_USER__');
      window.location.href = '/';
    } catch (e) {

    }
    
  }

  render() {
    const { handleLoginButtonClick, handleShowUserMenu, handleHideUserMenu, handleLogout } = this;
    const { user, solid, userMenu } = this.props;

    return (
      <Header 
        onLoginButtonClick={handleLoginButtonClick}
        onShowUserMenu={handleShowUserMenu}
        onHideUserMenu={handleHideUserMenu}
        onLogout={handleLogout}
        user={user}
        solid={solid}
        userMenu={userMenu}
      />
    );
  }
}

export default connect(
    (state) => ({
      user: state.user.get('user'),
      userMenu: state.base.getIn(['header', 'userMenu'])
    }),
    (dispatch) => ({
        BaseActions: bindActionCreators(baseActions, dispatch),
        AuthActions: bindActionCreators(authActions, dispatch)
    })
)(HeaderContainer);
