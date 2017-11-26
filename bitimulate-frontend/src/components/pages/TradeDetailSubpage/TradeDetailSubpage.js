import React, { Component } from 'react';
import styles from './TradeDetailSubpage.scss';
import classNames from 'classnames/bind';
import { TradeChartContainer, OrderBookContainer, TradeSectionContainer, TradeHistoryContainer } from 'containers';
import { Helmet } from 'react-helmet';
import { ResponsiveAd } from 'components';

const cx = classNames.bind(styles);

class TradeDetailSubpage extends Component { 
  scrollToTop = () => {
    document.documentElement.scrollTop = 0;
  }
  componentDidMount() {
    this.scrollToTop();
  }
  componentDidUpdate(prevProps, prevState) {
    if(prevProps.match.params.currencyKey !== this.props.match.params.currencyKey) {
      this.scrollToTop();
    }
  }
  
  
  render() {
    const { currencyKey } = this.props.match.params;

    return (
      <div>
        <div>
          <Helmet>
            <title>{`[${currencyKey}] 거래소 :: Bitimulate`}</title>
            <meta name="description" content={`${currencyKey} 시세 확인 및 거래하기`}/>
          </Helmet>
        </div>
        <TradeChartContainer currencyKey={currencyKey}/>
        <TradeSectionContainer currencyKey={currencyKey}/>
        <OrderBookContainer/>
        <TradeHistoryContainer/>
        <div className="ad-area">
          <ResponsiveAd/>
        </div>
      </div>
    );
  }
}


export default TradeDetailSubpage;