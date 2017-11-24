import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { TradeHistoryTable, ReportTemplate, LoadMore } from 'components';
import * as reportActions from 'store/modules/report';
import * as baseActions from 'store/modules/base';
import { withRouter } from 'react-router-dom';
import { WalletsContainer } from 'containers';


class ReportContainer extends Component {
  prev = null

  initialize = async () => {
    const { ReportActions, BaseActions, displayName } = this.props;
    ReportActions.initialize();
    try {
      await Promise.all([
        ReportActions.getUserWallet(displayName),
        ReportActions.getUserOrders(displayName)
      ]);
    } catch (e) {
      if(!e.response || !e.response.data) {
        BaseActions.showMsgbox({
          type: 'error',
          text: '오류가 발생했습니다.'
        });
        return;
      }
      if(e.response.status === 404) {
        const { history } = this.props;
        history.replace('/ranking');
        BaseActions.showMsgbox({
          type: 'error',
          text: '존재하지 않는 유저입니다.'
        })
      }
    }
  }

  handleNextClick = () => {
    const { ReportActions, next } = this.props;
    if(this.prev === next || !next) return;
    this.prev = next;

    ReportActions.getNextOrders(next);    
  }

  componentDidMount() {
    this.initialize();
  }
  
  render() {
    const { handleNextClick } = this;
    const { orders, next } = this.props;
    return (
      <ReportTemplate
        tradeHistory={(
          [
            <TradeHistoryTable key={0} data={orders} forPage personal/>,
            next && <LoadMore key={1} onClick={handleNextClick}/>
          ]
        )}
        wallet={(
          <WalletsContainer hideName isReport/>
        )}
      />
    )
  }
}

export default connect(
  (state) => ({
    orders: state.report.get('orders'),
    next: state.report.get('next')
  }),
  (dispatch) => ({
    ReportActions: bindActionCreators(reportActions, dispatch),
    BaseActions: bindActionCreators(baseActions, dispatch)
  })
)(withRouter(ReportContainer));