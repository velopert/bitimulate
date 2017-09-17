import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as tradeActions from 'store/modules/trade';
import { TradeChart } from 'components';


class TradeChartContainer extends Component {

  loadChartData = () => {
    const { TradeActions, currencyKey, chartType } = this.props;
    
    TradeActions.getChartData({
      name: `BTC_${currencyKey}`,
      type: chartType // defaultValue, for now
    })
  }

  handleSelectChartType = (type) => {
    const { TradeActions } = this.props;
    TradeActions.setChartType(type);
  }

  componentDidMount() {
    this.loadChartData();
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.currencyKey !== this.props.currencyKey
      || prevProps.chartType !== this.props.chartType
    ) {
      this.loadChartData();
    }
  }
  
  
  render() {
    const { chartData, chartType, loading } = this.props;
    const { handleSelectChartType } = this;
    return (
      <TradeChart 
        data={chartData} 
        loading={loading} 
        chartType={chartType}
        onSelectChartType={handleSelectChartType}/>
    )
  }
}

export default connect(
  (state) => ({
    loading: state.pender.pending['trade/GET_CHART_DATA'],
    chartData: state.trade.getIn(['detail', 'chartData']),
    chartType: state.trade.getIn(['detail', 'chartType'])
  }),
  (dispatch) => ({
    TradeActions: bindActionCreators(tradeActions, dispatch)
  })
)(TradeChartContainer);