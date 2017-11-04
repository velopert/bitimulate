import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as Actions from 'store/modules/';
import { ProfitChart, ProfitInfo } from 'components';


class Profit extends Component {
  render() {
    return (
      <div>
        <ProfitInfo/>
        <ProfitChart/>
      </div>
    )
  }
}

export default connect(
  (state) => ({}),
  (dispatch) => ({
    Actions: bindActionCreators(Actions, dispatch)
  })
)(Profit);