import React from 'react';
import { PageTemplate, PolyBackground } from 'components';
import {HeaderContainer} from 'containers';
import styles from './HomePage.scss';
import classNames from 'classnames/bind';
import IntroQuestionContainer from 'containers/IntroQuestionContainer';


const cx = classNames.bind(styles);

const HomePage = () => {
  return (
    <PageTemplate 
      header={<HeaderContainer/>}>
      <PolyBackground>
        <IntroQuestionContainer/>
      </PolyBackground>
    </PageTemplate>
  );
};

export default HomePage;