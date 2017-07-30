import React from 'react';
import styles from './PageTemplate.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const PageTemplate = ({header, children, responsive}) => {
  return (
    <div className={cx('page')}>
      <header>
        {header}
      </header>
      <main className={cx('content', {
        'has-header': header, // if there is a header, gives 3.5 padding to top
        responsive
      })}>
        {children}
      </main>
    </div>
  );
};

export default PageTemplate;