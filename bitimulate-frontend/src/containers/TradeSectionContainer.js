import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as tradeActions from 'store/modules/trade';
import { TradeSection } from 'components';

class TradeSectionContainer extends Component {
  render() {
    return (
      <TradeSection></TradeSection>
    )
  }
}

export default connect(
  (state) => ({}),
  (dispatch) => ({
    TradeActions: bindActionCreators(tradeActions, dispatch)
  })
)(TradeSectionContainer);