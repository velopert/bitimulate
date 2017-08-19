import React from 'react';
import { Dimmer, Spinner } from 'components';

const DimmerSpinner = ({visible}) => {

  if(!visible) return null;
  return (
    <Dimmer>
      <Spinner/>
    </Dimmer>
  );
};

export default DimmerSpinner;