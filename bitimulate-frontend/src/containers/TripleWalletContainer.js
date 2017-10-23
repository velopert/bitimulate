import React, { Component } from 'react';
import { TripleWallet } from 'components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as tradeActions from 'store/modules/trade';
import * as userActions from 'store/modules/user';
import * as commonActions from 'store/modules/common';
import { waitUntil } from 'lib/utils';


function aggregateWallet(wallet, walletOnOrder) {
  const aggregated = [];
  const walletData = wallet.toJS();
  for(let currency in walletData) {
    aggregated.push({
      currency,
      value: wallet.get(currency) + (walletOnOrder.get(currency) || 0)
    })
  }
  return aggregated;
}

class TrippleWalletContainer extends Component {
  
  componentDidMount() {
    this.initialize();
  }
  
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

  render() {
    const { rate, wallet, walletOnOrder } = this.props;
    const aggregated = aggregateWallet(wallet, walletOnOrder);
    
    if(rate.isEmpty()) return null;

    aggregated.forEach(
      w => {
        if(w.currency === 'BTC') {
          w.last = 1;
          return;
        }
        if(w.currency === 'USD') {
          const btcRate = rate.find(r => r.get('currencyKey') === 'BTC');
          if(!btcRate) return w;
          w.last = 1 / btcRate.get('last');
          return;
        }

        const info = rate.find(r => r.get('currencyKey') === w.currency);
        if(!info) return w;
        w.last = info.get('last'); 
      }
    );

    

    return (
      <TripleWallet/>
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
)(TrippleWalletContainer);