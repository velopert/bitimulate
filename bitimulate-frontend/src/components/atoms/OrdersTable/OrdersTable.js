import React, { Component } from 'react';
import styles from './OrdersTable.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const Row = ({price, volume, flicker}) => {
  const digits = volume && (10 - Math.floor(Math.log10(volume)));

  return (
    <div className={cx('row', { flicker })}>
      <div className={cx('value')}>{price}</div>
      <div className={cx('value')}>{volume && volume.toFixed(digits >= 10 ? 10 : digits)}</div>
    </div>
  )
}

class AnimatedRow extends Component {
  timeoutId = null

  state = {
    flicker: true
  }

  componentWillUnmount() {
    if(this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }
  
  flicker = () => {
    this.setState({
      flicker: true
    });
    this.timeoutId = setTimeout(() => {
      this.timeoutId = null;
      this.setState({
        flicker: false
      });
    }, 500)
  }
  

  componentDidMount() {
    this.flicker();
  }
  
  componentDidUpdate(prevProps, prevState) {
    if(prevProps.volume !== this.props.volume) {
      this.flicker();
    }
  }
  
  
  render() {
    const { flicker } = this.state;
    return <Row {...this.props} flicker={flicker}/>
  }
}



const OrdersTable = ({type, currency, data}) => {


  const rows = data && data.map(
    order => {
      const [price, volume] = order.toJS();
      return <AnimatedRow key={price} price={price} volume={volume}/>
    }
  );

  const emptyRows = new Array(20).fill(0).map(
    (_, i) => <Row key={i}/>
  )

  return (
    <div className={cx('orders-table')}>
      <div className={cx('title')}>
        {type}주문
      </div>
      <div className={cx('table-head')}>
        <div className={cx('col-desc')}>
          가격 ({currency === 'BTC' ? 'USD' : 'BTC'})
        </div>
        <div className={cx('col-desc')}>
          {type}량 ({currency})
        </div>
      </div>
      {(!data || data.isEmpty()) ? emptyRows : rows}
    </div>
  );
};

export default OrdersTable;