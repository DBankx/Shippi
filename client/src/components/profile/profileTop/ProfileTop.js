import React, { useState } from 'react';
import NameDisplay from './NameDisplay';
import { Row, Col } from 'antd';

const ProfileTop = ({ profile }) => {
  return (
    <div className='profile-top'>
      <Row>
        <Col xl={12}>
          <NameDisplay profile={profile} />
        </Col>
      </Row>
    </div>
  );
};

export default ProfileTop;
