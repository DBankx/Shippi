import React from 'react';
import { List, Avatar } from 'antd';
import { getCode } from 'country-list';
import OverallRating from './OverallRating';

const NameDisplay = ({ profile: { user, feedback } }) => {
  const data = [
    {
      title: user.username
    }
  ];

  //   get the country code;
  const countryCode = getCode(user.country);

  return (
    <div>
      <List
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar size={150} src={user.avatar} alt='avatar' />}
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
                </div>
              }
            />
          </List.Item>
        )}
      ></List>
    </div>
  );
};

export default NameDisplay;
