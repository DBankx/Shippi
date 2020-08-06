import React from 'react';
import { Avatar, List, Popover } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const UserDisplay = ({ user }) => {
  const data = [
    {
      title: user && user.username
    }
  ];

  const links = (
    <div className='pop-links'>
      <Link to='/sell'>Sell a product</Link>
      <Link to={`/profile/${user.username}`}>View profile</Link>
      <Link to={`/orders`}>Orders</Link>
      <Link to='/settings'>Settings</Link>
    </div>
  );

  return (
    <div className='user-display'>
      <Popover placement='bottom' content={links}>
        <List
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                title={
                  <strong>
                    {item.title} <CaretDownOutlined />
                  </strong>
                }
                description={user && 'Hi' + ' ' + user.firstName}
                avatar={<Avatar src={user && user.avatar} />}
              />
            </List.Item>
          )}
        ></List>
      </Popover>
    </div>
  );
};

UserDisplay.propTypes = {};

export default UserDisplay;
