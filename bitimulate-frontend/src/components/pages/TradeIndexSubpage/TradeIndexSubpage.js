import React from 'react';
import styles from './TradeIndexSubpage.scss';
import classNames from 'classnames/bind';
import { Selector, SortReverser } from 'components';
import { TradeIndexContainer } from 'containers';

const cx = classNames.bind(styles);

const sorterOptions = [
  {
    name: 'alphabet',
    text: '알파벳순'
  },
  {
    name: 'percentage',
    text: '변화율순'
  },
  {
    name: 'price',
    text: '가치순'
  },
  {
    name: 'volume',
    text: '볼륨순'
  }
]

const TradeIndexSubpage = () => {
  return (
    <div className={cx('trade-index-subpage')}>
      <div className={cx('options')}>
        <div className={cx('selector')}><Selector options={sorterOptions}/></div>
        <div className={cx('reverser')}><SortReverser/></div>
        
      </div>
      <TradeIndexContainer/>
    </div>
  );
};

export default TradeIndexSubpage;