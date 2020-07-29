import React from 'react';
import { List, Avatar, Button, Badge, Tooltip } from 'antd';
import { getCode } from 'country-list';
import OverallRating from './OverallRating';
import { connect } from 'react-redux';
import { MailOutlined } from '@ant-design/icons';

const NameDisplay = ({ profile: { user, feedback, _id, status }, auth }) => {
  const data = [
    {
      title: user.username
    }
  ];

  //   get the country code;
  const countryCode = getCode(user && user.country);

  return (
    <div>
      <List
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Tooltip title={status}>
                  <Badge
                    dot
                    color={status === 'Online' ? '#87d068' : '#f50'}
                    offset={[-20, 20]}
                  >
                    <Avatar size={150} src={user.avatar} alt='avatar' />
                  </Badge>
                </Tooltip>
              }
              title={
                <p style={{ fontSize: '2em', color: '#000' }}>{item.title}</p>
              }
              description={
                <div className='description'>
                  <p>{user.role === 'both' ? 'Buyer/Seller' : user.role}</p>
                  {countryCode !== null ? (
                    <p>
                      <img
                        src={`https://www.countryflags.io/${countryCode}/shiny/64.png`}
                        style={{ width: '30px' }}
                      />{' '}
                      {countryCode}
                    </p>
                  ) : (
                    <p>{user.country}</p>
                  )}
                  <OverallRating feedback={feedback} role={user.role} />
                  {(auth && auth.user === null) || auth.user._id !== _id ? (
                    <div className='hide-lg hide-xl hide-md'>
                      <Button
                        type='primary'
                        icon={<MailOutlined />}
                        style={{
                          backgroundColor: '#89c9b8',
                          borderColor: '#89c9b8',
                          marginTop: '2.5em'
                        }}
                      >
                        Contact
                      </Button>
                    </div>
                  ) : null}
                </div>
              }
            />
          </List.Item>
        )}
      ></List>
    </div>
  );
};

const mapState = ({ auth }) => ({
  auth
});

export default connect(mapState)(NameDisplay);
