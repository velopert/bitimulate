import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as Actions from 'store/modules/';
import { ProfitChart, ProfitInfo } from 'components';
import * as tradeActions from 'store/modules/trade';
import * as userActions from 'store/modules/user';
import * as commonActions from 'store/modules/common';
import { waitUntil } from 'lib/utils';
import compose from 'lodash/fp/compose';
import { getAggregatedWallet, getCorrespondingRate } from 'lib/aggregateWallet';



class Profit extends Component {

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
    UserActions.getEarningsHistory();
  }

  componentDidMount() {
    this.initialize();
  }

  render() {
    const { rate, initial, earningsHistory, monthly } = this.props;
    
    if(rate.isEmpty()) return null;
    const btcRate = rate.find(r => r.get('currencyKey') === 'BTC');
    if(!btcRate) return null; 

  
    const walletData = this.getWalletData();
    const sum = walletData.reduce((acc, {value, last}) => {
      return acc + value * last;
    }, 0);

    return (
      <div>
        <ProfitInfo
          initial={initial}
          monthly={monthly}
          current={{
            btc: sum,
            usd: sum * btcRate.get('last')
          }}
        />
        <ProfitChart earningsHistory={earningsHistory}/>
      </div>
    )
  }
}

export default connect(
  (state) => ({
    krwRate: state.common.get('krwRate'),
    rate: state.trade.get('rate'),
    wallet: state.user.get('wallet'),
    walletOnOrder: state.user.get('walletOnOrder'),
    currencyInfo: state.common.get('currencyInfo'),
    initial: state.user.getIn(['metaInfo', 'initial']),
    monthly: state.user.getIn(['metaInfo', 'monthly']),
    earningsHistory: state.user.get('earningsHistory')
  }),
  (dispatch) => ({
    TradeActions: bindActionCreators(tradeActions, dispatch),
    UserActions: bindActionCreators(userActions, dispatch),
    CommonActions: bindActionCreators(commonActions, dispatch),
  })
)(Profit);