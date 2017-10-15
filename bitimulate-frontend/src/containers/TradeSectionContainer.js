import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as tradeActions from 'store/modules/trade';
import * as userActions from 'store/modules/user';
import { TradeSection } from 'components';
import socket from 'lib/socket';
import { limitDigit } from 'lib/utils';

class TradeSectionContainer extends Component {

  initialize = () => {
    const { currentPrice, TradeActions } = this.props;
    if(currentPrice) {
      TradeActions.initializeTradeAction(currentPrice.toFixed(10));
    }
  }

  handleCreateOrder = async ({
    currencyPair,
    price,
    amount,
    sell
  }) => {
    const { TradeActions, UserActions } = this.props;
    try {
      await TradeActions.createOrder({
        currencyPair, price, amount, sell
      });
      await UserActions.getWallet();
    } catch (e) {

    }
  }

  handleChangeInput = (type, name, value) => {
    const { TradeActions } = this.props;
    TradeActions.changeTradeBoxInput({
      type,
      name,
      value
    });
  }

  handleRefreshPrice = (type) => {
    const { TradeActions, currentPrice } = this.props;
    TradeActions.changeTradeBoxInput({
      type,
      name: 'price',
      value: currentPrice.toFixed(10)
    });
  }

  componentDidMount() {
    this.initialize();
    socket.subscribe('ORDER_PROCESSED');
  }

  componentWillUnmount() {
    socket.unsubscribe('ORDER_PROCESSED');
  }
  

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.currencyType !== this.props.currencyType || (!prevProps.currentPrice && this.props.currentPrice)) {
      this.initialize();
    }
  }
  
  

  render() {
    const { currencyType, selectedRate, buy, sell, wallet, disableButton } = this.props;
    const { handleChangeInput, handleRefreshPrice, handleCreateOrder } = this;


    return (
      <TradeSection 
        currencyType={currencyType} 
        selectedRate={selectedRate}
        buy={buy}
        sell={sell}
        onChangeInput={handleChangeInput}
        onRefreshPrice={handleRefreshPrice}
        onCreateOrder={handleCreateOrder}
        wallet={wallet}
        disableButton={disableButton}
      />
    )
  }
}

export default connect(
  (state, ownProps) => {
    const currencyType = state.trade.getIn(['detail', 'currencyType']);
    const current = state.trade.get('rate').find(r=>r.get('currencyKey') === currencyType);

    return {
      currencyType: currencyType,
      currentPrice: current && current.get('last'),
      buy: state.trade.getIn(['detail', 'tradeSection', 'buy']),
      sell: state.trade.getIn(['detail', 'tradeSection', 'sell']),
      disableButton: state.trade.getIn(['detail', 'tradeSection', 'disableButton']),
      wallet: state.user.get('wallet')
    }
  },
  (dispatch) => ({
    TradeActions: bindActionCreators(tradeActions, dispatch),
    UserActions: bindActionCreators(userActions, dispatch)
  })
)(TradeSectionContainer);