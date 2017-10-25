import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as userActions from 'store/modules/user';
import { TradeHistoryTable } from 'components';

class WalletHistories extends Component {
  render() {
    return (
      <div>
        <section>
          <h2>대기중인 거래</h2>
          <TradeHistoryTable forPage/>
        </section>
        <section>
          <h2>체결된 거래</h2>
          <TradeHistoryTable forPage/>
        </section>
      </div>
    )
  }
}

export default connect(
  (state) => ({}),
  (dispatch) => ({
    UserActions: bindActionCreators(userActions, dispatch)
  })
)(WalletHistories);