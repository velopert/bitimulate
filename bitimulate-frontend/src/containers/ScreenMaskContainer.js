import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScreenMask } from 'components';


class ScreenMaskContainer extends Component {

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.visible !== this.props.visible) { 
      // if visible value is changed, hide or show the scrollbar
      document.body.style.overflowY = this.props.visible ? 'hidden' : 'auto';
    }
  }
  
  
  render() {
    return (<ScreenMask {...this.props}/>)
  }
}

export default connect(
  (state) => ({
    visible: state.base.getIn(['screenMask', 'visible'])
  })
)(ScreenMaskContainer);
