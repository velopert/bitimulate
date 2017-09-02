import React from 'react';
import styles from './HoverCard.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const HoverCard = ({className, ...rest}) => {
  return (
    <div className={cx('hover-card', className)} {...rest}>
      
    </div>
  );
};

export default HoverCard;