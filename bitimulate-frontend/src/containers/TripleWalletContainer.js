import React, { Component } from 'react';
import { TripleWallet } from 'components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as tradeActions from 'store/modules/trade';
import * as userActions from 'store/modules/user';
import * as commonActions from 'store/modules/common';


class TrippleWalletContainer extends Component {
  
  componentDidMount() {
    this.initialize();
  }
  
  initialize = () => {
    const { TradeActions, CommonActions, krwRate } = this.props;
    
    if(!krwRate) {
      CommonActions.getKrwRate();
    }

    TradeActions.getInitialRate();
  }

  render() {
    return (
      <TripleWallet/>
    );
  }
}

export default connect(
  state => ({
    krwRate: state.common.get('krwRate'),
    rate: state.trade.get('rate')
  }),
  dispatch => ({
    TradeActions: bindActionCreators(tradeActions, dispatch),
    UserActions: bindActionCreators(userActions, dispatch),
    CommonActions: bindActionCreators(commonActions, dispatch)
  })
)(TrippleWalletContainer);