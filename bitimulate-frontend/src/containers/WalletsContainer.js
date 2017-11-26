import React, { Component } from 'react';
import { Wallets } from 'components';

import * as tradeActions from 'store/modules/trade';
import * as userActions from 'store/modules/user';
import * as commonActions from 'store/modules/common';
import { waitUntil } from 'lib/utils';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import compose from 'lodash/fp/compose';
import { getAggregatedWallet, getCorrespondingRate } from 'lib/aggregateWallet';

class WalletsContainer extends Component {
  getAggregatedWallet = () => {
    const { wallet, walletOnOrder } = this.props;
    return getAggregatedWallet(wallet, walletOnOrder);
  }

  getCorrespondingRate = (aggregated) => {
    const { rate } = this.props;
    return getCorrespondingRate(aggregated, rate);
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

    const { rate, krwRate, hideName, wallet} = this.props;

    
    if(rate.isEmpty() || !wallet) return null;
    const walletData = this.getWalletData();

    const sum = walletData.reduce((acc, {value, last}) => {
      if(!value) return acc;
      return acc + value * last;
    }, 0);

    const btcRate = rate.find(r => r.get('currencyKey') === 'BTC');
    
    if(!btcRate) return null; 
    
    const btcMultiplier = btcRate.get('last');

    
    // console.log(aggregated);
    return (
      <Wallets
        sum={sum}
        krwRate={krwRate}
        btcMultiplier={btcMultiplier}
        walletData={walletData}
        hideName={hideName}
      />
    );
  }
}

export default connect(
  (state, ownProps) => {
    const { isReport } = ownProps;
    if(!isReport) {
      return {
        krwRate: state.common.get('krwRate'),
        rate: state.trade.get('rate'),
        wallet: state.user.get('wallet'),
        walletOnOrder: state.user.get('walletOnOrder'),
        currencyInfo: state.common.get('currencyInfo'),
      }
    } 
    return {
      krwRate: state.common.get('krwRate'),
      rate: state.trade.get('rate'),
      wallet: state.report.getIn(['walletData', 'wallet']),
      walletOnOrder: state.report.getIn(['walletData', 'walletOnOrder']),
      currencyInfo: state.common.get('currencyInfo'),
    }
  },
  dispatch => ({
    TradeActions: bindActionCreators(tradeActions, dispatch),
    UserActions: bindActionCreators(userActions, dispatch),
    CommonActions: bindActionCreators(commonActions, dispatch),
  })
)(WalletsContainer);