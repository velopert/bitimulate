import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as tradeActions from 'store/modules/trade';
import { OrderBook } from 'components';


class OrderBookContainer extends Component {
  
  getOrderBook = async () => {
    const { TradeActions, currencyType } = this.props;
    if(!currencyType) return;
    
    const currencyPair = currencyType === 'BTC' ? 'USDT_BTC' : `BTC_${currencyType}`;
    
    try {
      await TradeActions.getOrderBook(currencyPair);
    } catch (e) {

    }
  }
  
  startWork = () => {
    this.work();    clearTimeout(this.timeoutId);

  }

  work = async () => {
    await this.getOrderBook();
    this.timeoutId = setTimeout(() => {
      this.work();
    }, 250)
  }
  
  componentDidMount() {
    this.startWork();
  }
  
  componentDidUpdate(prevProps, prevState) {
    if(prevProps.currencyType !== this.props.currencyType) {
      this.startWork();
    }
  }
  
  render() {
    return (
      <OrderBook/>
    )
  }
}

export default connect(
  (state) => ({
    currencyType: state.trade.getIn(['detail', 'currencyType'])
  }),
  (dispatch) => ({
    TradeActions: bindActionCreators(tradeActions, dispatch)
  })
)(OrderBookContainer);