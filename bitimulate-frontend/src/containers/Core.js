import React, { Component } from 'react';

// import redux dependencies
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as commonActions from 'store/modules/common';
import * as tradeActions from 'store/modules/trade';

class Core extends Component {
  componentDidMount() {
    const { CommonActions, TradeActions } = this.props;
    CommonActions.getCurrencyInfo();
    TradeActions.getInitialRate();
  }
  
  render() {
    return null;
  }
}

export default connect(
    (state) => ({

    }),
    (dispatch) => ({
        CommonActions: bindActionCreators(commonActions, dispatch),
        TradeActions: bindActionCreators(tradeActions, dispatch)
    })
)(Core);
