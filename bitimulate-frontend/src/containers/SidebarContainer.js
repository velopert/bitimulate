import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as baseActions from 'store/modules/base';
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

  render() {
    const { visible } = this.props;

    const { handleToggle, handleClose } = this;
    return [
      visible && <Dimmer style={{ zIndex: 8 }} onClick={handleClose}/>,
      <Sidebar visible={visible}/>,
      <Hamburger active={visible} onToggle={handleToggle}/>
    ]
  }
}

export default connect(
  (state) => ({
    visible: state.base.getIn(['sidebar', 'visible'])
  }),
  (dispatch) => ({
    BaseActions: bindActionCreators(baseActions, dispatch)
  })
)(SidebarContainer);