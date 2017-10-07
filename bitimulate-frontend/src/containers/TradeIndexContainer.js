import React, { Component } from 'react';
import { TradeIndex } from 'components';
// import redux dependencies
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as tradeActions from 'store/modules/trade';
import * as userActions from 'store/modules/user';
import * as commonActions from 'store/modules/common';

import socket from 'lib/socket';

const sortKey = {
  alphabet: 'currencyKey',
  percentage: 'percentChange',
  price: 'last',
  volume: 'baseVolume'
};

function generatePinMap(list) {
  const object = {};
  
  list.forEach(key => {
    object[key] = true;
  });

  return object;
}


class TradeIndexContainer extends Component {
  initialize = async () => { 
    const { TradeActions, CommonActions, krwRate } = this.props;
    
    if(!krwRate) {
      CommonActions.getKrwRate();
    }

    await new Promise((resolve, reject) => {
      const check = () => {
        let timeoutId = null;
        setTimeout(() => {
          clearTimeout(timeoutId);
          reject()
        }, 10000);
        if(this.props.currencyInfo.isEmpty()) {
          timeoutId = setTimeout(check, 0);
          return;
        }
        resolve();
      }
      check();
    });
    
    TradeActions.getInitialRate();
  }

  componentDidMount() {
    this.initialize();
    socket.subscribe('TICKER');
  }

  componentWillUnmount() {
    socket.unsubscribe('TICKER');
  }
  

  savePin = () => {
    const { UserActions, pinned } = this.props;
    UserActions.patchMetaInfo({
      pinned: pinned.toJS()
    });    
  }

  componentDidUpdate(prevProps, prevState) {
    // if(prevProps.pinned !== this.props.pinned) {
    //   // update @ pin
    //   this.savePin();
    // }
  }
  
  handleTogglePin = (key) => {
    const { UserActions } = this.props;
    UserActions.togglePinKey(key);
    setTimeout(() => {
      this.savePin();
    }, 0)
  }

  render() {
    const { handleTogglePin } = this;
    const { rate, options, pinned, krwRate } = this.props;
    const { showPinned, sortBy, asc } = options.toJS();

    let processedRate = rate.sortBy(r=>r.get(sortKey[sortBy]));
    
    if(!asc) {
      processedRate = processedRate.reverse();
    }

    const pinMap = generatePinMap(pinned);
    
    return (
      <TradeIndex 
        rate={processedRate} 
        onTogglePin={handleTogglePin} 
        pinMap={pinMap}
        showPinned={showPinned} 
        krwRate={krwRate}
      />
    );
  }
}

export default connect(
    (state) => ({
      options: state.trade.getIn(['index', 'options']),
      rate: state.trade.get('rate'),
      pinned: state.user.getIn(['metaInfo', 'pinned']),
      currencyInfo: state.common.get('currencyInfo'),
      krwRate: state.common.get('krwRate')
    }),
    (dispatch) => ({
        TradeActions: bindActionCreators(tradeActions, dispatch),
        UserActions: bindActionCreators(userActions, dispatch),
        CommonActions: bindActionCreators(commonActions, dispatch)
    })
)(TradeIndexContainer);
