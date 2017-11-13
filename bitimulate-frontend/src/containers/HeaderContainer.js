import React, { Component } from 'react';
import { Header } from 'components';
// import redux dependencies
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as baseActions from 'store/modules/base';
import * as authActions from 'store/modules/auth';
import { throttle } from 'lodash';

import storage from 'lib/storage';

class HeaderContainer extends Component {
  state = {
    shadow: false
  }

  handleScroll = throttle((e) => {
    const { scrollTop } = document.documentElement;
    const shadow = scrollTop !== 0;
    if(this.state.shadow !== shadow) {
      this.setState({
        shadow
      });
    }
  }, 500);

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }
  
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
    const { shadow } = this.state;

    return (
      <Header 
        onLoginButtonClick={handleLoginButtonClick}
        onShowUserMenu={handleShowUserMenu}
        onHideUserMenu={handleHideUserMenu}
        onLogout={handleLogout}
        user={user}
        solid={solid}
        userMenu={userMenu}
        shadow={shadow}
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
