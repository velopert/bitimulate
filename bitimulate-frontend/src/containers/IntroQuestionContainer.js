import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as Actions from 'store/modules/';
import { IntroQuestion } from 'components';

class IntroQuestionContainer extends Component {
  render() {
    return (
      <IntroQuestion/>
    )
  }
}

export default connect(
  (state) => ({}),
  (dispatch) => ({
    Actions: bindActionCreators(Actions, dispatch)
  })
)(IntroQuestionContainer);