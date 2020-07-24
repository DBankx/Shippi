import React from 'react';
import logo from '../../../images/logo.svg';
import { Row, Col } from 'antd';
import InputTop from './InputTop';
import LeftMenu from './LeftMenu';
import RightMenu from './RightMenu';

const Navbar = () => {
  return (
    <div className='navbar-nav'>
      <div className='container'>
        <Row align='middle' justify='middle' className='nav'>
          <Col xs={6} lg={2} md={2} sm={2}>
            <LeftMenu />
          </Col>
          <Col lg={3} xs={12} md={4} sm={4}>
            <img src={logo} alt='logo' className='logo-top' />
          </Col>
          <Col lg={12} xs={0} md={12} sm={12}>
            <InputTop />
          </Col>
          <Col xs={6} lg={7} md={6} sm={6}>
            <RightMenu />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Navbar;
