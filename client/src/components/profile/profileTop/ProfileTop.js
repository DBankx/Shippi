import React, { useState } from 'react';
import NameDisplay from './NameDisplay';
import { Row, Col } from 'antd';
import OtherDetails from './OtherDetails';

const ProfileTop = ({ profile }) => {
  return (
    <div className='profile-top'>
      <Row>
        <Col xl={12} xs={24} lg={12} md={12} sm={24}>
          <NameDisplay profile={profile} />
        </Col>
        <Col xl={12} xs={0} lg={12} md={12} sm={0}>
          <OtherDetails profile={profile} />
        </Col>
      </Row>
    </div>
  );
};

export default ProfileTop;
