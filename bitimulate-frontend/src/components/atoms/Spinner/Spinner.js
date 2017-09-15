import React from 'react';

const Spinner = ({size="200px", color="currentColor", ...rest}) => {
  return (
    <svg width={size}  height={size}  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" className="lds-rolling" {...rest}>
      <circle cx="50" cy="50" fill="none" opacity="0.9" stroke={color} strokeWidth="3" r="15" strokeDasharray="70.68583470577033 25.561944901923447" transform="rotate(72 50 50)">
        <animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;360 50 50" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animateTransform>
      </circle>
    </svg>
  );
};

export default Spinner;