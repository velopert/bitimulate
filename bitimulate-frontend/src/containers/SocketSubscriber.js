import React, { Component } from 'react';
import socket from 'lib/socket';

class SocketSubscriber extends Component {
  componentDidMount() {
    const { channel } = this.props;
    socket.subscribe(channel);
  }

  componentWillUnmount() {
    const { channel } = this.props;
    socket.unsubscribe(channel);
  }
  
  
  render() {
    return (
      null
    );
  }
}

export default SocketSubscriber;