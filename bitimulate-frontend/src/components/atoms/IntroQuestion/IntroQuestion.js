import React from 'react';
import styles from './IntroQuestion.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const IntroQuestion = () => (
  <div className={cx('question')}>          
  <div>
    <h1>
      당신에게 100 비트코인, 혹은 10만 달러의 자본금이 있다면,
      얼마나 수익을 낼 수 있을 것 같나요?
    </h1>
    <p>
      실제 거래소의 실시간 데이터에 기반하여 
      <br/>모의 거래를 해보세요!
    </p>
  </div>
  <div className={cx('button')}>
    모의거래 시작하기
  </div>
</div>
);

export default IntroQuestion;