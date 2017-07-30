import React from 'react';
import { Header, PageTemplate, PolyBackground, Block } from 'components';

const HomePage = () => {
  return (
    <PageTemplate 
      header={<Header/>}>
      <PolyBackground>
        <Block center shadow>
          <h1>
            모의 거래소에서 다양한 가상화폐를 거래해보세요.
          </h1>
          <h2>
            실제 거래소의 실시간 데이터에 기반하여 거래가 진행됩니다.
          </h2>
        </Block>
      </PolyBackground>
    </PageTemplate>
  );
};

export default HomePage;