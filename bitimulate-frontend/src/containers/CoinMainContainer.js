import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { CoinMain, SpinnerBlock } from 'components';
import { coinsInHome } from 'lib/variables'

class CoinMainContainer extends Component {
  render() {
    const { rate } = this.props;

    if(rate.size === 0) {
      return <SpinnerBlock/>
    }


    const filteredRate = rate.filter(
      r => coinsInHome.indexOf(r.get('currencyKey')) !== -1
    ).sort((a,b) => coinsInHome.indexOf(a.get('currencyKey')) - coinsInHome.indexOf(b.get('currencyKey')));

    return (
      <CoinMain rate={filteredRate}/>
    )
  }
}

export default connect(
  (state) => ({
    rate: state.trade.get('rate')
  }),
  (dispatch) => ({
  })
)(CoinMainContainer);