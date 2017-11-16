import React from 'react';
import { PageTemplate, PolyBackground, BgColor, CoinMain } from 'components';
import {HeaderContainer, CoinMainContainer, SocketSubscriber} from 'containers';
import styles from './HomePage.scss';
import classNames from 'classnames/bind';
import IntroQuestionContainer from 'containers/IntroQuestionContainer';
import MoreIcon from 'react-icons/lib/md/more-vert';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);


const HomePage = () => {
  return (
    <PageTemplate 
      header={<HeaderContainer/>}>
      <SocketSubscriber channel="TICKER"/>
      <PolyBackground home>
        <IntroQuestionContainer/>
      </PolyBackground>
      <BgColor color="#f6f6f6"/>
      <div className={cx('block')}>
        <h2>비티뮬레이트에선, 현재 총 <b>68</b>개의 가상화폐를 지원합니다.</h2>
        <CoinMainContainer/>
        <div className={cx('more')}>
          <Link className={cx('more-button')} to="/trade">
            거래소에서 더 보기
          </Link>
        </div>
      </div>
      
    </PageTemplate>
  );
};

export default HomePage;