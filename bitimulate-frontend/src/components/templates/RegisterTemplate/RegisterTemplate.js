import React from 'react';
import styles from './RegisterTemplate.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const RegisterTemplate = ({children}) => {
  return (
    <div className={cx('register-template')}>
      <h1>회원 등록</h1>
      <p>거의 다 끝났습니다. 가상화폐 모의 거래소 이용에 필요한 몇가지 정보를 입력하세요.</p>
      <section>
        {children}
      </section>
    </div>
  );
};

export default RegisterTemplate;