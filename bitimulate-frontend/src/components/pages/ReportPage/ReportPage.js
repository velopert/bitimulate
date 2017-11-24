import React from 'react';
import styles from './ReportPage.scss';
import classNames from 'classnames/bind';
import { PageTemplate, Card } from 'components';
import { HeaderContainer, ReportContainer, SocketSubscriber } from 'containers';


const cx = classNames.bind(styles);

const ReportPage = ({match}) => {
  const { displayName } = match.params;

  return (
    <PageTemplate header={<HeaderContainer solid/>} padding>
      <div className={cx('block')}>
      </div>
      <Card className={cx('ranking-box')}>
        <h1>{displayName}님의 리포트</h1>
        <hr/>
        <ReportContainer displayName={displayName}/>
      </Card>
      <SocketSubscriber channel="TICKER"/>
    </PageTemplate>
  );
}

export default ReportPage;