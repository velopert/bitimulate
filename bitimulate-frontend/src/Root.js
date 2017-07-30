import React from 'react';
import App from 'components/App';
import { BrowserRouter, Route } from 'react-router-dom';

const Root = () => {
  return (
    <div>
      <BrowserRouter>
        <Route path="/" component={App}/>
      </BrowserRouter>
    </div>
  );
}

export default Root;