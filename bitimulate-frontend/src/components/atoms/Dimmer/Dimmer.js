import React, { Component } from 'react';
import styles from './Dimmer.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

class Dimmer extends Component {
  componentDidMount() {
    // hides scroll-y
    document.body.style.overflowY = 'hidden';
  }  

  componentWillUnmount() {
    // shows scroll-y
    document.body.style.overflowY = 'auto';
  }
  
  render() {
    const { ...rest } = this.props;
    
    return (
      <div className={cx('dimmer')} {...rest}>
        
      </div>
    )
  }

}

export default Dimmer;