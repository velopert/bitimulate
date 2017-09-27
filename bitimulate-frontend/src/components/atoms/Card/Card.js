import React from 'react';
import styles from './Card.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const Card = ({children, className, ...rest}) => {
  return (
    <div className={cx('card', className)} {...rest}>
      {children}
    </div>
  );
};

export default Card;