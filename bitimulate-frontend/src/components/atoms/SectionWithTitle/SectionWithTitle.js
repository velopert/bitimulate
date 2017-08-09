import React from 'react';
import styles from './SectionWithTitle.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const SectionWithTitle = ({title, children}) => {
  return (
    <section className={cx('section-with-title')}>
      <h3>{title}</h3>
      <section>
        {children}
      </section>
    </section>
  );
};

export default SectionWithTitle;