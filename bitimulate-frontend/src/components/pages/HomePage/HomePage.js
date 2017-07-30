import React from 'react';
import { Header, PageTemplate } from 'components';

const HomePage = () => {
  return (
    <PageTemplate 
      header={<Header/>}
      responsive>
      Home
    </PageTemplate>
  );
};

export default HomePage;