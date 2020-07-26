import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const Spinner = () => {
  const loadingIcon = (
    <LoadingOutlined style={{ fontSize: 35, color: '#89c9b8' }} />
  );

  return (
    <div className='spinner'>
      <Spin indicator={loadingIcon} />
    </div>
  );
};

export default Spinner;
