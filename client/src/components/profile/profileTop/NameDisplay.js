import React from 'react';
import { List, Avatar, Button, Badge, Tooltip } from 'antd';
import { getCode } from 'country-list';
import OverallRating from './OverallRating';
import { connect } from 'react-redux';
import { MailOutlined } from '@ant-design/icons';

const NameDisplay = ({ profile, auth }) => {
  const data = [
    {
      title: profile && profile.username
    }
  ];

  let countryCode = getCode(profile !== null && profile.country);

  return (
    <div>
      <List
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Tooltip title={profile && profile.status}>
                  <Badge
                    dot
                    color={
                      profile && profile.status === 'Online'
                        ? '#87d068'
                        : '#f50'
                    }
                    offset={[-20, 20]}
                  >
                    <Avatar
                      size={150}
                      src={profile && profile.avatar}
                      alt='avatar'
                    />
                  </Badge>
                </Tooltip>
              }
              title={
                <p style={{ fontSize: '2em', color: '#000' }}>{item.title}</p>
              }
              description={
                <div className='description'>
                  <p>{profile && profile.role}</p>
                  {countryCode !== null ? (
                    <p>
                      <img
                        src={`https://www.countryflags.io/${countryCode}/shiny/64.png`}
                        alt='country flag'
                        style={{ width: '30px' }}
                      />{' '}
                      {countryCode}
                    </p>
                  ) : (
                    <p>{profile && profile.country}</p>
                  )}
                  <OverallRating
                    feedback={profile && profile.feedback}
                    role={profile && profile.role}
                  />
                  {(auth && auth.user === null) ||
                  auth.user._id !== profile.user ? (
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
