import React, { Component } from 'react';
import { TradeHistory } from 'components';
// import redux dependencies
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as tradeActions from 'store/modules/trade';

class TradeHistoryContainer extends Component {
  render() {
    return (
      <TradeHistory/>
    );
  }
}

export default connect(
  null,
  (dispatch) => ({
    TradeActions: bindActionCreators(tradeActions, dispatch)
  })
)(TradeHistoryContainer);