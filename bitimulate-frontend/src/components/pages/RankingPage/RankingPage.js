import React from 'react';
import styles from './RankingPage.scss';
import classNames from 'classnames/bind';
import { PageTemplate, Card, PolyBackground, ResponsiveAd } from 'components';
import { HeaderContainer, RankingContainer } from 'containers';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const RankingPage = ({match}) => {
  const { type } = match.params;

  return (
    <PageTemplate header={<HeaderContainer solid/>} padding>
      <Helmet>
        <title>랭킹 :: Bitimulate</title>
        <meta name="description" content="사용자들의 모의 거래 수익률 랭킹"/>
      </Helmet>
      <div className={cx('block')}>
      </div>
      <Card className={cx('ranking-box')}>
        <div className={cx('ads-area')}>
          <ResponsiveAd/>
        </div>
        <h1>수익률 랭킹</h1>
        <div className={cx('description')}>
          수익률은 USD를 기반으로 계산됩니다.
          <br/>랭킹은 1시간마다 매겨집니다.
          <br/>월 수익률 랭킹 1위에겐 상금이 주어집니다!
          <br/>
          <br/>어뷰징이 발견될 시 롤백처리 될 수 있습니다.
        </div>
        <hr/>
        <div className={cx('type-selector')}>
          <Link to="/ranking/monthly" className={cx('type', {
            active: !type || type === 'monthly'
          })}>
            월 수익률
          </Link>
          <Link to="/ranking/total" className={cx('type', {
            active: type === 'total'
          })}>
            전체 수익률
          </Link>
        </div>
        <RankingContainer type={type}/>
      </Card>
    </PageTemplate>
  );
}

export default RankingPage;