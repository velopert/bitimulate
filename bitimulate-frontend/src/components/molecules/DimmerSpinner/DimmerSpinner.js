import React from 'react';
import { Dimmer, Spinner } from 'components';

const DimmerSpinner = ({visible}) => {

  if(!visible) return null;
  return (
    <Dimmer>
      <Spinner color="#ffffff"/>
    </Dimmer>
  );
};

export default DimmerSpinner;