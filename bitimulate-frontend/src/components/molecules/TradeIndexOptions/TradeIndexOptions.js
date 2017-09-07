import React from 'react';
import styles from './TradeIndexOptions.scss';
import classNames from 'classnames/bind';
import PinIcon from 'react-icons/lib/ti/pin';

import { Selector, SortReverser, Option } from 'components';

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

const cx = classNames.bind(styles);

const TradeIndexOptions = ({
  sortBy,
  asc,
  showPinned,
  onToggleAsc,
  onSelectSort,
  onToggleShowPinned
}) => {
  return (
    <div className={cx('options')}>
      <div className={cx('show-pinned')}>
        <Option onClick={onToggleShowPinned} active={showPinned}>
          핀만 보기
        </Option>
      </div>
      <div className={cx('selector')}><Selector onSelect={onSelectSort} value={sortBy} options={sorterOptions}/></div>
      <div className={cx('reverser')}><SortReverser asc={asc} onToggle={onToggleAsc}/></div>
    </div>
  );
};

export default TradeIndexOptions;