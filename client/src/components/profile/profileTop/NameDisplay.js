import React from 'react';
import { List, Avatar } from 'antd';
import lookup from 'country-code-lookup';
import { getNames } from 'country-list';

const NameDisplay = ({ profile: { user } }) => {
  const data = [
    {
      title: user.username
    }
  ];

  //   get the country code;
  const countryCode = lookup.byCountry(user.country);

  console.log(countryCode);
  console.log(getNames());
  console.log(lookup.byCountry('nigeria'));

  return (
    <div>
      <List
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar size={200} src={user.avatar} />}
              title={<h1>{user.username}</h1>}
              description={
                <div className='description'>
                  <p>{user.role === 'both' ? 'Buyer/Seller' : user.role}</p>
                  {countryCode !== null ? (
                    <p>
                      <img
                        src={`https://www.countryflags.io/${countryCode.internet}/shiny/64.png`}
                        style={{ width: '30px' }}
                      />{' '}
                      {countryCode.internet}
                    </p>
                  ) : (
                    <p>{user.country}</p>
                  )}
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
