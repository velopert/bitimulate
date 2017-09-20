import React, { Component } from 'react';
import styles from './RateInfoCard.scss';
import classNames from 'classnames/bind';
import { HoverCard } from 'components';
import PinIcon from 'react-icons/lib/ti/pin';
import { getCurrency } from 'lib/utils';
import scuize from 'lib/hoc/scuize';
import { withRouter } from 'react-router'
import { scrollTo } from 'lib/utils';


const cx = classNames.bind(styles);

class RateInfoCard extends Component {

  state = {
    highlight: false,
    greater: true
  }

  timeoutId = null;

  handleOpenCurrency = () => {
    const { history, currencyKey } = this.props;
    history.push(`/trade/${currencyKey}`);
    scrollTo(0);
  }

  componentWillUnmount() {
    if(this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }
  
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.info !== nextProps.info
          || this.props.pinned !== nextProps.pinned
          || this.state.highlight !== nextState.highlight
          || this.state.greater !== nextState.greater
  }

  highlight = (greater) => {
    this.setState({
      highlight: true,
      greater
    });

    this.timeoutId = setTimeout(() => {
      this.setState({
        highlight: false
      });
    }, 1000)
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.last !== this.props.last) {
      this.highlight(this.props.last > prevProps.last);
    }
  }  

  render() {
    const {
      currencyKey="ETH", 
      last=4.7e-7, 
      volume="125543", 
      percentage="0.01", 
      currencyName="Ethereum", 
      onTogglePin, 
      pinned
    } = this.props;
    const { highlight, greater } = this.state;
    const { handleOpenCurrency } = this;

    if(!currencyName) return null;
    if(currencyKey === 'BTC') return null;
    
      const parsedPercentage = Math.round(parseFloat(percentage) * 10000) / 100;
      const parsedVolume = Math.round(parseFloat(volume) * 100) / 100;
      const value = last.toFixed(9);
    
      return (
        <div className={cx('wrapper')}>
          <HoverCard className={cx('rate-info-card', highlight && (greater ? 'green' : 'red'))} onClick={handleOpenCurrency}>
            <div className={cx('head')}>
              <div className={cx('short-name')}>{currencyKey}</div>
              <div className={cx('pin-wrapper', { active: pinned })}><PinIcon onClick={(e) => { e.stopPropagation(); onTogglePin(); }}/></div>
            </div>
            <div className={cx('percentage', { positive: parsedPercentage > 0, netural: parsedPercentage === 0 })}>({parsedPercentage.toFixed(2)}%)</div>
            <div className={cx('value')}>{value}</div>
            <div className={cx('name')}>{currencyName}</div>
            <div className={cx('volume')}>
              <b>볼륨 </b>
              <span>{parsedVolume}</span>
            </div>
          </HoverCard>
        </div>
      );

  }
}

export default withRouter(RateInfoCard);