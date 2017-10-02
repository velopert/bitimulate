import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as tradeActions from 'store/modules/trade';
import { TradeSection } from 'components';

class TradeSectionContainer extends Component {

  initialize = () => {
    const { currentPrice, TradeActions } = this.props;
    TradeActions.initializeTradeAction(currentPrice);
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
      value: currentPrice
    });
  }

  componentDidMount() {
    this.initialize();
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(prevProps);
    if(prevProps.currencyType !== this.props.currencyType || (!prevProps.currentPrice && this.props.currentPrice)) {
      this.initialize();
    }
  }
  
  

  render() {
    const { currencyType, selectedRate, buy, sell, wallet } = this.props;
    const { handleChangeInput, handleRefreshPrice } = this;


    return (
      <TradeSection 
        currencyType={currencyType} 
        selectedRate={selectedRate}
        buy={buy}
        sell={sell}
        onChangeInput={handleChangeInput}
        onRefreshPrice={handleRefreshPrice}
        wallet={wallet}
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
      wallet: state.user.get('wallet')
    }
  },
  (dispatch) => ({
    TradeActions: bindActionCreators(tradeActions, dispatch)
  })
)(TradeSectionContainer);