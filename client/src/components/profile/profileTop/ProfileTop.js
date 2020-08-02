import React from 'react';
import NameDisplay from './NameDisplay';
import { Row, Col } from 'antd';
import OtherDetails from './OtherDetails';

const ProfileTop = ({ profile }) => {
  return (
    <div className='profile-top'>
      <Row justify='center'>
        <Col xl={12} xs={24} lg={12} md={12} sm={24}>
          <NameDisplay profile={profile && profile} />
        </Col>
        <Col xl={6} xs={0} lg={6} md={10} sm={0}>
          <OtherDetails profile={profile && profile} />
        </Col>
      </Row>
    </div>
  );
};

export default ProfileTop;
