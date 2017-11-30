import React, { Component } from 'react';
import styles from './ResponsiveAd.scss';
import classNames from 'classnames/bind';
import debounce from 'lodash/debounce';

const cx = classNames.bind(styles);

class ResponsiveAd extends Component {

  state = {
    show: true
  }

  // handleResize = debounce(() => {
  //   this.setState({
  //     show: false
  //   });

  //   setTimeout(() => {
  //     this.setState({
  //       show: true
  //     });
  //   }, 0);
  // }, 1000)

  componentDidUpdate(prevProps, prevState) {
    if(this.state.show && prevState.show !== this.state.show) {
      this.loadAds();
    }
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ show: false });
  }
  

  loadAds = () => {
    try {
      const adsbygoogle = window.adsbygoogle || [];
      adsbygoogle.push({});
    } catch (e) {
      
    }
  }

  componentDidMount() {
    this.loadAds();
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }
  
  render() {
    const { show } = this.state;
    return null;
    if(!show) return null;
    return (
      <ins className="adsbygoogle" style={{display: 'block'}} data-ad-client="ca-pub-5574866530496701" data-ad-slot="4466813182" data-ad-format="auto"></ins>
    );
  }
}

export default ResponsiveAd;