import React from 'react';
import styles from './PageTemplate.scss';
import classNames from 'classnames/bind';
import { SidebarContainer } from 'containers';


const cx = classNames.bind(styles);

const PageTemplate = ({header, children, responsive, padding}) => {
  return (
    <div className={cx('page')}>
      <header>
        {header}
      </header>
      { header && <SidebarContainer/> }
      
      <main className={cx('content', {
        padding: padding, // sets 3.5 rem padding-top
        responsive
      })}>
        {children}
      </main>
    </div>
  );
};

export default PageTemplate;