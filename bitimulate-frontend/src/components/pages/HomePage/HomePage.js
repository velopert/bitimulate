import React from 'react';
import { PageTemplate, PolyBackground, BgColor, CoinMain } from 'components';
import {HeaderContainer} from 'containers';
import styles from './HomePage.scss';
import classNames from 'classnames/bind';
import IntroQuestionContainer from 'containers/IntroQuestionContainer';
import MoreIcon from 'react-icons/lib/md/more-vert';


const cx = classNames.bind(styles);


const HomePage = () => {
  return (
    <PageTemplate 
      header={<HeaderContainer/>}>
      <PolyBackground home>
        <IntroQuestionContainer/>
      </PolyBackground>
      <BgColor color="#f6f6f6"/>
      <div className={cx('block')}>
        <CoinMain/>
        <div className={cx('message')}>
          <MoreIcon/>
          <h2>비티뮬레이트에선, 총 <b>68</b>개의 가상화폐를 지원합니다.</h2>
        </div>
      </div>
      
    </PageTemplate>
  );
};

export default HomePage;