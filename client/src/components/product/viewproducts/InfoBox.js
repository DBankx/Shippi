import React from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';

const InfoBox = () => {
  return (
    <div
      style={{
        padding: '1em'
      }}
      className='info-box'
    >
      <p style={{ fontSize: '16px' }}>
        <InfoCircleOutlined style={{ color: '#89c9b8' }} /> Please use the
        refinment tools to get relevant results
      </p>
    </div>
  );
};

export default InfoBox;
