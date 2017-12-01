import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as tradeActions from 'store/modules/trade';
import { OrderBook } from 'components';



class OrderBookContainer extends Component {
  
  timeoutId = null
  cancel = null

  getOrderBook = async () => {
    const { TradeActions, currencyType } = this.props;
    if(!currencyType) return;
    
    const currencyPair = currencyType === 'BTC' ? 'USDT_BTC' : `BTC_${currencyType}`;
    
    try {
      const p = TradeActions.getOrderBook(currencyPair);
      this.cancel = p.cancel;
      await p;
    } catch (e) {

    }
  }
  
  startWork = () => {
    this.clearRepeater();
    this.work();
  }

  work = async () => {
    console.log('i am working');
    try {
      await this.getOrderBook();
      if(this.cancel) {
        this.timeoutId = setTimeout(() => {
          this.work();
        }, 500)
      }

    } catch (e) {

    }
  }
  
  componentDidMount() {
    this.startWork();
  }
  
  componentDidUpdate(prevProps, prevState) {
    if(prevProps.currencyType !== this.props.currencyType) {
      this.startWork();
    }
  }
  
  clearRepeater = () => {
    const { TradeActions } = this.props;
    TradeActions.resetOrderBook();

    if(this.cancel) {
      this.cancel();
      this.cancel = null;
    }
    if(this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
      console.log('cancelling timeoutId');
    }
    
  }

  componentWillUnmount() {
    this.clearRepeater();
  }
  
  
  render() {
    const { currencyType, orderBook } = this.props;
    return (
      <OrderBook currencyType={currencyType} orderBook={orderBook}/>
    )
  }
}

export default connect(
  (state) => ({
    currencyType: state.trade.getIn(['detail', 'currencyType']),
    orderBook: state.trade.getIn(['detail', 'orderBook'])
  }),
  (dispatch) => ({
    TradeActions: bindActionCreators(tradeActions, dispatch)
  })
)(OrderBookContainer);