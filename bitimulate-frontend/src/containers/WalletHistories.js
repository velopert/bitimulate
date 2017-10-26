import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as userActions from 'store/modules/user';
import { TradeHistoryTable, LoadMore } from 'components';

class WalletHistories extends Component {
  last = {
    processed: null,
    waiting: null
  }

  initialize = () => {
    const { UserActions } = this.props;
    UserActions.getOrders({ status: 'processed'});
    UserActions.getOrders({ status: 'waiting'});
  }

  componentDidMount() {
    this.initialize();
  }

  getNextOrders = (status) => () => {
    const { UserActions, orders } = this.props;
    const next = orders.get('next').toJS();
    const nextURL = next[status];

    this.last[status] = nextURL;
    UserActions.getNextOrders({
      status,
      url: nextURL
    });
  }

  cancelOrder = (id) => {
    const { UserActions } = this.props;
    UserActions.cancelOrder(id);
  }
  

  render() {
    const { orders } = this.props;
    const { getNextOrders, cancelOrder } = this;
    const processed = orders.get('processed');
    const waiting = orders.get('waiting');
    const next = orders.get('next').toJS();

    return (
      <div>
        <section>
          <h2>대기중인 거래</h2>
          <TradeHistoryTable forPage data={waiting} personal showTooltip onCancelOrder={cancelOrder}/>
          {next.waiting && (
            <LoadMore onClick={getNextOrders('waiting')} />
          )}
        </section>
        <section>
          <h2>체결된 거래</h2>
          <TradeHistoryTable forPage data={processed} personal/>
          { next.processed && <LoadMore onClick={getNextOrders('processed')}/>}
        </section>
      </div>
    )
  }
}

export default connect(
  (state) => ({
    orders: state.user.get('orders')
  }),
  (dispatch) => ({
    UserActions: bindActionCreators(userActions, dispatch)
  })
)(WalletHistories);