import React from 'react';
import styles from './Card.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const Card = ({children, className, noPadding, ...rest}) => {
  return (
    <div className={cx('card', { noPadding }, className)} {...rest}>
      {children}
    </div>
  );
};

export default Card;