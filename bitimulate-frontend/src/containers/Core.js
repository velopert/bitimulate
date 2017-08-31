import React, { Component } from 'react';

// import redux dependencies
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as commonActions from 'store/modules/common';

class Core extends Component {
  componentDidMount() {
    const { CommonActions } = this.props;
    CommonActions.getCurrencyInfo();
  }
  
  render() {
    return null;
  }
}

export default connect(
    (state) => ({

    }),
    (dispatch) => ({
        CommonActions: bindActionCreators(commonActions, dispatch)
    })
)(Core);
