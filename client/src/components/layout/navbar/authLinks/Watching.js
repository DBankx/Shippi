import React from 'react';
import { Badge, Popover } from 'antd';
import { BookOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const Watching = ({ watching }) => {
  return (
    <div>
      <Badge count={watching.length} color='#c4c4c4'>
        <Popover
          placement='bottom'
          content={<Link to='/view-watching'>View Watching</Link>}
        >
          <BookOutlined style={{ fontSize: '1.5rem', fontWeight: 'lighter' }} />
        </Popover>
      </Badge>
    </div>
  );
};

export default Watching;
