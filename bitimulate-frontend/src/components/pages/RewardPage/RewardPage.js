import React from 'react';
import styles from './RewardPage.scss';
import classNames from 'classnames/bind';
import { PageTemplate } from 'components';
import { HeaderContainer, RewardWalletFormContainer } from 'containers';

const cx = classNames.bind(styles);

const RewardPage = () => (
  <PageTemplate header={<HeaderContainer solid/>} padding responsive>
    <div className={cx('reward-page')}>
      <h1>상금 지급용 지갑 설정</h1>
      <div className={cx('description')}>
        <p>매달 월 수익률 랭킹 1위에게 상금이 리플(XRP)로 지급됩니다.</p>
        <p>상급을 지급받을 리플 지갑 정보를 입력하세요.</p>
      </div>
      <div className={cx('form')}>
        <RewardWalletFormContainer/>
      </div>
    </div>
  </PageTemplate>
);

export default RewardPage;