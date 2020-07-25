import React from 'react';
import { Badge } from 'antd';
import { BellOutlined } from '@ant-design/icons';

const Notifications = ({ notifications }) => {
  return (
    <div>
      <Badge count={notifications.length} showZero>
        <BellOutlined style={{ fontSize: '1.5rem' }} />
      </Badge>
    </div>
  );
};

export default Notifications;
