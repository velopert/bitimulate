import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as tradeActions from 'store/modules/trade';
import { TradeChart } from 'components';


class TradeChartContainer extends Component {

  timeoutId = null
  cancelLastRequest = null

  loadChartData = async () => {
    const { TradeActions, currencyKey, chartType } = this.props;
    TradeActions.setCurrencyType(currencyKey);
    if(this.cancelLastRequest) {
      this.cancelLastRequest();
      this.cancelLastRequest = null;
    }
    try {
      const request = TradeActions.getChartData({
        name: currencyKey === 'BTC' ? 'USDT_BTC' : `BTC_${currencyKey}`,
        type: chartType
      });
      this.cancelLastRequest = request.cancel;
      await request;
    } catch (e) {
      console.log(e);
    }
    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(this.regularUpdate, 1000 * 60 * 2.5);
  }

  regularUpdate = async () => {
    const { TradeActions, currencyKey, chartType, timebase } = this.props;

    try {
      await TradeActions.regularUpdate({
        name: currencyKey === 'BTC' ? 'USDT_BTC' : `BTC_${currencyKey}`,
        type: chartType,
        timebase
      });
    } catch (e) {

    }
    this.timeoutId = setTimeout(this.regularUpdate, 1000 * 60 * 2.5);
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

  componentWillUnmount() {
    clearTimeout(this.timeoutId);
  }
  
  
  
  render() {
    const { chartData, chartType, loading, currencyKey, selectedRate } = this.props;
    const { handleSelectChartType } = this;
    return (
      <TradeChart 
        data={chartData} 
        loading={loading} 
        chartType={chartType}
        currencyKey={currencyKey}
        onSelectChartType={handleSelectChartType}
        selectedRate={selectedRate}/>
    )
  }
}

export default connect(
  (state, ownProps) => ({
    loading: state.pender.pending['trade/GET_CHART_DATA'],
    chartData: state.trade.getIn(['detail', 'chartData']),
    chartType: state.trade.getIn(['detail', 'chartType']),
    timebase: state.trade.getIn(['detail', 'timebase']),
    selectedRate: state.trade.get('rate').find(r=>r.get('currencyKey') === ownProps.currencyKey)
  }),
  (dispatch) => ({
    TradeActions: bindActionCreators(tradeActions, dispatch)
  })
)(TradeChartContainer);