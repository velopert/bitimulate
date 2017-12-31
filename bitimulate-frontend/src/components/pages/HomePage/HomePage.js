import React from 'react';
import { PageTemplate, PolyBackground, BgColor, CoinMain, Card } from 'components';
import {HeaderContainer, CoinMainContainer, SocketSubscriber} from 'containers';
import styles from './HomePage.scss';
import classNames from 'classnames/bind';
import IntroQuestionContainer from 'containers/IntroQuestionContainer';
import MoreIcon from 'react-icons/lib/md/more-vert';
import { Link } from 'react-router-dom';
import TrophyIcon from 'react-icons/lib/fa/trophy';
import GithubIcon from 'react-icons/lib/go/mark-github';
import EmailIcon from 'react-icons/lib/md/email';
import { Helmet } from 'react-helmet';

const cx = classNames.bind(styles);


const HomePage = () => {
  return (
    <PageTemplate 
      header={<HeaderContainer/>}>
      <Helmet>
        <title>Bitimulate - 가상화폐 모의 거래소</title>
        <meta name="keywords" content="가상화폐, 암호화폐, 모의, 거래, 거래소, 비트코인, 이더리움, BTC, ETH"/>
        <meta name="description" content="가상화폐 / 암호화폐 모의 거래소 Bitimulate (비티뮬레이트), 과연 당신은 가상화폐 시장에서 수익을 낼 수 있을까요? 모의거래를 통해 알아보세요."/>
      </Helmet>
      <SocketSubscriber channel="TICKER"/>
      <PolyBackground home>
        <IntroQuestionContainer/>
      </PolyBackground>
      <BgColor color="#f6f6f6"/>
      <div className={cx('block', 'responsive')}>
        <h2>비티뮬레이트에선, 현재 총 <b>69</b>개의 가상화폐를 지원합니다.</h2>
        <CoinMainContainer/>
        <div className={cx('more')}>
          <Link className={cx('more-button')} to="/trade">
            거래소에서 더 보기
          </Link>
        </div>
      </div>
      <div className={cx('third')}>
        <div className={cx('responsive', 'grid')}>
          <Link to="/ranking" className={cx('column')}>
            <TrophyIcon/>
            <div className={cx('description')}>
              <h3>랭킹 시스템</h3>
              <p>수익률을 다른 사람들과 경쟁해보세요. <br/>그리고, 다른사람들의 거래 전략을 확인해보세요!</p>
            </div>
          </Link>
          <a className={cx('column')} href="https://github.com/velopert/bitimulate" target="_blank" rel="noopener noreferrer">
            <GithubIcon/>
            <div className={cx('description')}>
              <h3>오픈소스</h3>
              <p>비티뮬레이트는 오픈소스 프로젝트 입니다. <br/>Pull Request는 언제나 환영입니다.</p>
            </div>
          </a>
        </div>
        <div className={cx('my-message', 'responsive')}>
          <div>
          상금은 페이지 내의 광고비를 통해 충당됩니다.<br/>
          여러분들이 이 서비스를 더 자주 사용해주시면, 상금이 더 높아집니다.
          </div>
        </div>
      </div>
      <div className={cx('footer')}>
        <div className={cx('email')}>
          <EmailIcon/> support@bitimulate.com
        </div>
        <div className={cx('copyright')}>
          Copyright © 2017 Bitimulate
        </div>
        <div className={cx('copyright')}>
        <Link to="/terms">개인정보취급방침</Link>
      </div>
      </div>
    </PageTemplate>
  );
};

export default HomePage;