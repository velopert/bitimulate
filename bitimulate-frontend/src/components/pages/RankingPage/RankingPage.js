import React from 'react';
import styles from './RankingPage.scss';
import classNames from 'classnames/bind';
import { PageTemplate, Paper, PolyBackground } from 'components';
import { HeaderContainer, RankingContainer } from 'containers';

const cx = classNames.bind(styles);

const RankingPage = () => (
  <PageTemplate header={<HeaderContainer/>}>
    <PolyBackground fixed half={true}/>
    <Paper className={cx('ranking-box')}>
      <h1>수익률 랭킹</h1>
      <div className={cx('description')}>
        수익률은 USD를 기반으로 계산됩니다.
        <br/>랭킹은 1시간마다 매겨집니다.
      </div>
      <hr/>
      <RankingContainer/>
    </Paper>
  </PageTemplate>
);

export default RankingPage;