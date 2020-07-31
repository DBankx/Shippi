import React from 'react';
import { Badge } from 'antd';
import { NotificationOutlined } from '@ant-design/icons';

const Notifications = ({ notifications }) => {
  return (
    <div>
      <Badge count={notifications.length}>
        <NotificationOutlined style={{ fontSize: '1.5rem' }} />
      </Badge>
    </div>
  );
};

export default Notifications;
