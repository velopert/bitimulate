import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as tradeActions from 'store/modules/trade';
import * as userActions from 'store/modules/user';
import { TradeIndexOptions } from 'components';

class TradeIndexOptionsContainer extends Component {

  getWalletKeys = () => {
    const { wallet, walletOnOrder } = this.props;
    const combinedWallet = Object.assign({}, wallet.toJS(), walletOnOrder.toJS());
    const keys = [];
    for(let key in combinedWallet) {
      if(wallet.get(key) || walletOnOrder.get(key)) {
        keys.push(key);
        console.log(key);
      }
    }
    return keys;
  }
  
  handleToggleAsc = () => {
    const { TradeActions, options } = this.props;
    const asc = options.get('asc');
    TradeActions.setIndexOption({
      name: 'asc',
      value: !asc
    });
  }
  
  handleSelectSort = (value) => {
    const { TradeActions } = this.props;
    TradeActions.setIndexOption({
      name: 'sortBy',
      value
    });
  }

  handleToggleShowPinned = () => {
    const { TradeActions } = this.props;
    TradeActions.toggleShowPinned();
  }

  savePin = () => {
    const { UserActions, pinned } = this.props;
    UserActions.patchMetaInfo({
      pinned: pinned.toJS()
    });    
  }
  
  handleAutoPin = () => {
    const { UserActions, TradeActions, options } = this.props;
    UserActions.resetPin();
    const keys = this.getWalletKeys();
    keys.forEach(key => UserActions.togglePinKey(key));
    setTimeout(() => {
      this.savePin();
    }, 0);
    
    if(!options.get('showPinned')) {
      this.handleToggleShowPinned();
    }

  }

  render() {
    const { handleToggleAsc, handleSelectSort, handleToggleShowPinned, handleAutoPin } = this;
    const { options } = this.props;
    const { sortBy, asc, showPinned } = options.toJS();

    return (
      <TradeIndexOptions 
        sortBy={sortBy} 
        asc={asc}
        showPinned={showPinned}
        onToggleAsc={handleToggleAsc}
        onSelectSort={handleSelectSort}
        onToggleShowPinned={handleToggleShowPinned}
        onAutoPin={handleAutoPin}
      />
    );
  }
}

export default connect(
  (state) => ({
    options: state.trade.getIn(['index', 'options']),
    wallet: state.user.get('wallet'),
    walletOnOrder: state.user.get('walletOnOrder'),
    pinned: state.user.getIn(['metaInfo', 'pinned']),
  }),
  (dispatch) => ({
    TradeActions: bindActionCreators(tradeActions, dispatch),
    UserActions: bindActionCreators(userActions, dispatch),
  })
)(TradeIndexOptionsContainer);