import React from 'react';
import { Header, PageTemplate, PolyBackground } from 'components';

const HomePage = () => {
  return (
    <PageTemplate 
      header={<Header/>}>
      <PolyBackground></PolyBackground>
    </PageTemplate>
  );
};

export default HomePage;