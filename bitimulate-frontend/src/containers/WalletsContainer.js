import React, { Component } from 'react';
import { Wallets } from 'components';

import * as tradeActions from 'store/modules/trade';
import * as userActions from 'store/modules/user';
import * as commonActions from 'store/modules/common';
import { waitUntil } from 'lib/utils';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import compose from 'lodash/fp/compose';

window.compose = compose;

class WalletsContainer extends Component {

  getAggregatedWallet = () => {
    const { wallet, walletOnOrder } = this.props;

    const aggregated = [];
    const walletData = wallet.toJS();
    for(let currency in walletData) {
      aggregated.push({
        valueOnOrder: walletOnOrder.get(currency),
        currency,
        value: wallet.get(currency) + (walletOnOrder.get(currency) || 0)
      })
    }
    return aggregated;
  }

  getCorrespondingRate = (aggregated) => {
    const { rate } = this.props;
    aggregated.forEach(
      w => {
        if(w.currency === 'BTC') {
          w.currencyName = 'Bitcoin';
          w.last = 1;
          return;
        }
        if(w.currency === 'USD') {

          const btcRate = rate.find(r => r.get('currencyKey') === 'BTC');
          if(!btcRate) return w;
          w.currencyName = 'Dollar';
          w.last = 1 / btcRate.get('last');
          return;
        }

        const info = rate.find(r => r.get('currencyKey') === w.currency);
        if(!info) return w;
        w.last = info.get('last'); 
        w.currencyName = info.get('currencyName');
      }
    );
    return aggregated;
  }

  getWalletData = compose([
    this.getAggregatedWallet, 
    this.getCorrespondingRate
  ].reverse());


  initialize = async () => {
    const { TradeActions, CommonActions, UserActions, krwRate } = this.props;
    
    if(!krwRate) {
      CommonActions.getKrwRate();
    }

    UserActions.getWallet();
    await waitUntil(() => {
      return !this.props.currencyInfo.isEmpty();
    })
    TradeActions.getInitialRate();
  }

  componentDidMount() {
    this.initialize();
  }
  
  
  render() {

    const { rate, wallet, krwRate, walletOnOrder } = this.props;
    // const aggregated = this.aggregateWallet();
    
    if(rate.isEmpty()) return null;
    const walletData = this.getWalletData();
    const sum = walletData.reduce((acc, {value, last}) => {
      return acc + value * last;
    }, 0);

    const btcRate = rate.find(r => r.get('currencyKey') === 'BTC');
    
    // circumstance when websocket has received new update before inital rate fetch
    if(!btcRate) return null; 
    
    const btcMultiplier = btcRate.get('last');

    
    // console.log(aggregated);
    return (
      <Wallets
        sum={sum}
        krwRate={krwRate}
        btcMultiplier={btcMultiplier}
        walletData={walletData}
      />
    );
  }
}

export default connect(
  state => ({
    krwRate: state.common.get('krwRate'),
    rate: state.trade.get('rate'),
    wallet: state.user.get('wallet'),
    walletOnOrder: state.user.get('walletOnOrder'),
    currencyInfo: state.common.get('currencyInfo'),
  }),
  dispatch => ({
    TradeActions: bindActionCreators(tradeActions, dispatch),
    UserActions: bindActionCreators(userActions, dispatch),
    CommonActions: bindActionCreators(commonActions, dispatch),
  })
)(WalletsContainer);