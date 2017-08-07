import React, { Component } from 'react';

import { RegisterScreen } from 'components';
// import redux dependencies
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as registerActions from 'store/modules/register';

class RegisterScreenContainer extends Component {
  render() {
    const { visible } = this.props;

    return (
      <RegisterScreen visible={visible}/>
    );
  }
}

export default connect(
    (state) => ({
      visible: state.register.get('visible')
    }),
    (dispatch) => ({
      RegisterActions: bindActionCreators(registerActions, dispatch)
    })
)(RegisterScreenContainer);
