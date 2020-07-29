import React from 'react';
import { Empty, Button } from 'antd';
import { Link } from 'react-router-dom';

const EmptyProfile = ({ user, main }) => {
  return (
    <div className='container empty'>
      <Empty
        image={Empty.PRESENTED_IMAGE_DEFAULT}
        imageStyle={{
          height: 60
        }}
        description={<span>Profile not found</span>}
      >
        {user && user.username === main ? (
          <Link to='/profile-setup'>
            <Button type='primary'>Create a profile</Button>
          </Link>
        ) : null}
      </Empty>
    </div>
  );
};

export default EmptyProfile;
