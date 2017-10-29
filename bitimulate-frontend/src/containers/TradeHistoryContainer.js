import React, { Component } from 'react';
import { TradeHistory } from 'components';
// import redux dependencies
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as tradeActions from 'store/modules/trade';
import * as userActions from 'store/modules/user';

class TradeHistoryContainer extends Component {
  lastRequestTime = null
  fetchedURL = null

  handleCancelOrder = async (id) => {
    const { TradeActions, UserActions } = this.props;
    try {
      await TradeActions.cancelOrder(id);
      await UserActions.getWallet();
    } catch (e) {

    }
  }

  handleScroll = (e) => {
    const { clientHeight, scrollHeight, scrollTop } = e.target;
    if(scrollHeight - (clientHeight + scrollTop) < 100) {
      const { next, TradeActions } = this.props;
      if(!next) return;
      if(next === this.fetchedURL) return;
      this.fetchedURL = next;
      TradeActions.getNextOrders(next);
    }
  }

  getPrivateHistory = async () => {
    const { currencyType, TradeActions } = this.props;
    TradeActions.getOrders({currencyPair: currencyType === 'BTC' ? 'USDT_BTC' : `BTC_${currencyType}`});
  }

  getPublicHistory = async () => {
    const { currencyType, TradeActions } = this.props;

    this.clearWork();

    const currencyPair = currencyType === 'BTC' ? 'USDT_BTC' : `BTC_${currencyType}`;
    const now = Math.round(new Date() / 1000);

    try {
      await TradeActions.getTradeHistory({
        currencyPair
      });
      this.lastRequestTime = now + 1;
      this.work();
    } catch (e) {
      
    }
  }  

  clearWork = () => {
    if(this.cancel) {
      this.cancel();
      this.cancel = null;
    }

    if(this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }

  work = async () => {
    const { currencyType, TradeActions } = this.props;
    const currencyPair = currencyType === 'BTC' ? 'USDT_BTC' : `BTC_${currencyType}`;

    const now = Math.round(new Date() / 1000);

    try {
      const p = TradeActions.getTradeHistory({
        currencyPair,
        start: this.lastRequestTime,
        end: now
      });
      this.cancel = p.cancel;
      await p;
      this.lastRequestTime = now + 1;
    } catch (e) {

    }
    this.timeoutId = setTimeout(() => {
      this.work();
    }, 2000);
  }

  componentDidMount() {
      const { currencyType } = this.props;
      if(currencyType) {
        this.getPublicHistory();
        this.getPrivateHistory();
      }
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.currencyType !== this.props.currencyType) {
      this.getPublicHistory();
      this.getPrivateHistory()
    }
  }
  
  
  render() {
    const { handleCancelOrder, handleScroll } = this;
    const { tradeHistory, privateOrders, next } = this.props;
    return (
      <TradeHistory 
        historyData={tradeHistory} 
        privateOrders={privateOrders} 
        onCancelOrder={handleCancelOrder}
        onScroll={handleScroll}
        hasNext={next}
      />
    );
  }
}

export default connect(
  (state) => ({
    privateOrders: state.trade.getIn(['detail', 'privateOrders']),
    currencyType: state.trade.getIn(['detail', 'currencyType']),
    tradeHistory: state.trade.getIn(['detail', 'tradeHistory']),
    next: state.trade.getIn(['detail', 'nextPrivateOrdersLink'])
  }),
  (dispatch) => ({
    TradeActions: bindActionCreators(tradeActions, dispatch),
    UserActions: bindActionCreators(userActions, dispatch)
  })
)(TradeHistoryContainer);