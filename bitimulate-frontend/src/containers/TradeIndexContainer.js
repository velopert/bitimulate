import React, { Component } from 'react';
import { TradeIndex } from 'components';
// import redux dependencies
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as tradeActions from 'store/modules/trade';

class TradeIndexContainer extends Component {
  initialize = () => { 
    const { TradeActions } = this.props;
    TradeActions.getInitialRate();
  }

  componentDidMount() {
    this.initialize();
  }
  
  render() {
    const { rate } = this.props;
    return (
      <TradeIndex rate={rate}/>
    );
  }
}

export default connect(
    (state) => ({
      rate: state.trade.get('rate')
    }),
    (dispatch) => ({
        TradeActions: bindActionCreators(tradeActions, dispatch)
    })
)(TradeIndexContainer);
