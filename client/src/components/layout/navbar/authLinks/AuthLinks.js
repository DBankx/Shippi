import React from 'react';
import { connect } from 'react-redux';
import { Avatar, Row, Col, List, Divider } from 'antd';
import { Link } from 'react-router-dom';
import CartIcon from './CartIcon';
import Notifications from './Notifications';
import Watching from './Watching';
import { isMobile } from 'mobile-device-detect';

const AuthLinks = ({ auth: { loading, user } }) => {
  const data = [
    {
      title: user && user.username
    }
  ];

  return (
    <div className='top-links'>
      <Row align='middle' justify='end'>
        <Col xl={4} lg={4} md={8} sm={12} xs={0}>
          <Notifications notifications={user && user.notifications} />
        </Col>
        <Col xl={4} lg={4} md={8} sm={12} xs={24}>
          <CartIcon cart={user && user.cart} />
        </Col>
        <Col xl={4} lg={4} md={8} sm={0} xs={0}>
          <Watching watching={user && user.watching} />
        </Col>
        <Col xl={12} lg={12} md={0} sm={0} xs={0}>
          <List
            dataSource={data}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src={user && user.avatar} />}
                  title={item.title}
                  description={user && user.firstName + ' ' + user.lastName}
                />
              </List.Item>
            )}
          ></List>
        </Col>
      </Row>
    </div>
  );
};

const mapState = ({ auth }) => ({
  auth
});

export default connect(mapState)(AuthLinks);
