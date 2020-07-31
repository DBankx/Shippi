import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import CartIcon from './CartIcon';
import Notifications from './Notifications';
import Watching from './Watching';
import UserDisplay from './UserDisplay';

const AuthLinks = ({ auth: { user } }) => {
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
          <UserDisplay user={user && user} />
        </Col>
      </Row>
    </div>
  );
};

const mapState = ({ auth }) => ({
  auth
});

export default connect(mapState)(AuthLinks);
