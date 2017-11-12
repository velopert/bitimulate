import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as baseActions from 'store/modules/base';
import * as authActions from 'store/modules/auth';
import storage from 'lib/storage';

import { Sidebar, Hamburger, Dimmer } from 'components';



class SidebarContainer extends Component {
  handleOpen = () => {
    const { BaseActions } = this.props;
    BaseActions.showSidebar();
  }
  
  handleClose = () => {
    const { BaseActions } = this.props;
    BaseActions.hideSidebar();
  }

  handleToggle = () => {
    const { visible } = this.props;
    const { handleClose, handleOpen } = this;
    if(visible) return handleClose();
    handleOpen();
  }

  handleLoginClick = () => {
    const { BaseActions, AuthActions } = this.props;
    BaseActions.setScreenMaskVisibility(true);
    AuthActions.toggleLoginModal();
    AuthActions.setModalMode('login');
    this.handleClose();
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
    const { visible, user } = this.props;

    const { handleToggle, handleClose, handleLoginClick, handleLogout } = this;
    return [
      visible && <Dimmer style={{ zIndex: 8 }} onClick={handleClose} key={0}/>,
      <Sidebar onLoginClick={handleLoginClick} visible={visible} user={user} key={1} onClose={handleClose} onLogout={handleLogout}/>,
      <Hamburger active={visible} onToggle={handleToggle} key={3}/>
    ]
  }
}

export default connect(
  (state) => ({
    user: state.user.get('user'),
    visible: state.base.getIn(['sidebar', 'visible'])
  }),
  (dispatch) => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
    AuthActions: bindActionCreators(authActions, dispatch)
  })
)(SidebarContainer);