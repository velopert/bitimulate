import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as tradeActions from 'store/modules/trade';
import { TradeChart } from 'components';


class TradeChartContainer extends Component {

  loadChartData = () => {
    const { TradeActions, currencyKey } = this.props;
    
    TradeActions.getChartData({
      name: `BTC_${currencyKey}`,
      type: 'month' // defaultValue, for now
    })
  }

  componentDidMount() {
    this.loadChartData();
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.currencyKey !== this.props.currencyKey) {
      this.loadChartData();
    }
  }
  
  
  render() {
    const { chartData, loading } = this.props;
    return (
      <TradeChart data={chartData} loading={loading}></TradeChart>
    )
  }
}

export default connect(
  (state) => ({
    loading: state.pender.pending['trade/GET_CHART_DATA'],
    chartData: state.trade.getIn(['detail', 'chartData'])
  }),
  (dispatch) => ({
    TradeActions: bindActionCreators(tradeActions, dispatch)
  })
)(TradeChartContainer);