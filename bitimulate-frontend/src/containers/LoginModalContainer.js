import React, { Component } from 'react';
// import redux dependencies
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { LoginModal } from 'components';

class LoginModalContainer extends Component {
  render() {
    const { visible } = this.props;
    return (
      <LoginModal visible={visible}/>
    );
  }
}

export default connect(
    (state) => ({
      visible: state.base.getIn(['screenMask', 'visible'])
    }),
    (dispatch) => ({
        // Actions: bindActionCreators(actions, dispatch)
    })
)(LoginModalContainer);
