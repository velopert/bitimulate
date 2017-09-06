import React, { Component } from 'react';
import { TradeIndex } from 'components';
// import redux dependencies
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as tradeActions from 'store/modules/trade';

const sortKey = {
  alphabet: 'currencyKey',
  percentage: 'percentChange',
  price: 'last',
  volume: 'baseVolume'
};

class TradeIndexContainer extends Component {
  initialize = () => { 
    const { TradeActions } = this.props;
    TradeActions.getInitialRate();
  }

  componentDidMount() {
    this.initialize();
  }
  
  render() {
    const { rate, options } = this.props;
    const { sortBy, asc } = options.toJS();

    let processedRate = rate.sortBy(r=>r.get(sortKey[sortBy]))
    if(!asc) {
      processedRate = processedRate.reverse();
    }
    return (
      <TradeIndex rate={processedRate}/>
    );
  }
}

export default connect(
    (state) => ({
      options: state.trade.getIn(['index', 'options']),
      rate: state.trade.get('rate')
    }),
    (dispatch) => ({
        TradeActions: bindActionCreators(tradeActions, dispatch)
    })
)(TradeIndexContainer);
