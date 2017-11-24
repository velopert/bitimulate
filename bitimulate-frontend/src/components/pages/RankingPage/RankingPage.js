import React from 'react';
import styles from './RankingPage.scss';
import classNames from 'classnames/bind';
import { PageTemplate, Card, PolyBackground } from 'components';
import { HeaderContainer, RankingContainer } from 'containers';
import { Helmet } from 'react-helmet';

const cx = classNames.bind(styles);

const RankingPage = () => (
  <PageTemplate header={<HeaderContainer solid/>} padding>
    <Helmet>
      <title>랭킹 :: Bitimulate</title>
      <meta name="description" content="사용자들의 모의 거래 수익률 랭킹"/>
    </Helmet>
    <div className={cx('block')}>
    </div>
    <Card className={cx('ranking-box')}>
      <h1>수익률 랭킹</h1>
      <div className={cx('description')}>
        수익률은 USD를 기반으로 계산됩니다.
        <br/>랭킹은 1시간마다 매겨집니다.
      </div>
      <hr/>
      <RankingContainer/>
    </Card>
  </PageTemplate>
);

export default RankingPage;