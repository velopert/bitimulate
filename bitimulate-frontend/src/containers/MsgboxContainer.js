import React, { Component } from 'react';
import {Msgbox} from 'components'
import * as baseActions from 'store/modules/base';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


class MsgboxContainer extends Component {
  handleExit = () => {
    const { BaseActions } = this.props;
    BaseActions.hideMsgbox();
  }

  render() {
    const { msgbox } = this.props;
    const { 
      text, type, visible
    } = msgbox.toJS();
    const { handleExit } = this;

    return (
      <Msgbox
        text={text}
        type={type}
        visible={visible}
        onExit={handleExit}
      />
    );
  }
}

export default connect(
  (state) => ({
    msgbox: state.base.get('msgbox')
  }),
  (dispatch) => ({
    BaseActions: bindActionCreators(baseActions, dispatch)
  })
)(MsgboxContainer);