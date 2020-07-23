import React, { useState } from 'react';
import {
  Row,
  Col,
  Button,
  Tooltip,
  Popover,
  Input,
  Form,
  Checkbox,
  Badge
} from 'antd';
import {
  ShoppingCartOutlined,
  UserOutlined,
  LockOutlined,
  PhoneOutlined,
  MailOutlined,
  TwitterOutlined,
  RedditOutlined,
  InstagramOutlined
} from '@ant-design/icons';
import logo from '../../../images/logo.svg';
import { Link } from 'react-router-dom';

const RightMenu = () => {
  const [visible, setVisible] = useState(false);

  const loginMenu = (
    <div className='login'>
      <h2>Sign In</h2>
      <Form
        name='normal_login'
        className='login-form'
        initialValues={{
          remember: true
        }}
      >
        <Form.Item
          name='email'
          rules={[
            {
              required: true,
              message: 'Please put in your Email!'
            }
          ]}
        >
          <Input
            prefix={<UserOutlined className='site-form-item-icon' />}
            placeholder='Email'
          />
        </Form.Item>
        <Form.Item
          name='password'
          rules={[
            {
              required: true,
              message: 'Please input your Password!'
            }
          ]}
        >
          <Input
            prefix={<LockOutlined className='site-form-item-icon' />}
            type='password'
            placeholder='Password'
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name='remember' valuePropName='checked' noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className='login-form-forgot' href=''>
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button
            type='primary'
            htmlType='submit'
            className='login-form-button'
          >
            Log in
          </Button>
          Or <a href=''>register now!</a>
        </Form.Item>
      </Form>
    </div>
  );

  const contactDetails = (
    <div className='details-top'>
      <h2>
        Contact <img src={logo} alt='logo' className='logo-contact' />
      </h2>
      <p>
        Email us: <strong>damiHundeyin@gmail.com</strong>
      </p>
      <p>
        Call us: <strong>+1-(0)-321-456-733</strong>
      </p>
      <p>
        Find us:
        <Row style={{ marginTop: '1em' }}>
          <Col span={6}>
            <TwitterOutlined style={{ fontSize: '30px' }} />
          </Col>
          <Col span={6}>
            <InstagramOutlined style={{ fontSize: '30px' }} />
          </Col>
          <Col span={6}>
            <RedditOutlined style={{ fontSize: '30px' }} />
          </Col>
        </Row>
      </p>
      <Button type='primary'>Send a Request</Button>
    </div>
  );

  const guestLinks = (
    <div className='top-links'>
      <Row align='middle' justify='space-between'>
        <Col xs={0} xl={4} lg={8} md={12}>
          <Popover content={loginMenu} placement='bottomRight'>
            <Button type='link'>
              <UserOutlined />
            </Button>
          </Popover>
        </Col>
        <Col span={4} xs={24} xl={4} lg={8} md={12}>
          <Tooltip
            placement='bottom'
            title={
              <span>
                <Link to='/login'>Sign In</Link> to use cart
              </span>
            }
          >
            <Button type='link'>
              <Badge count={0} showZero>
                <ShoppingCartOutlined style={{ fontSize: '1.5rem' }} />
              </Badge>
            </Button>
          </Tooltip>
        </Col>
        <Col xs={0} xl={4} lg={8} md={0}>
          <Popover placement='bottomRight' content={contactDetails}>
            <Button type='link'>
              <MailOutlined />
            </Button>
          </Popover>
        </Col>
        <Col lg={0} xs={0} md={0} xl={12}>
          <div className='call'>
            <strong>+1-(0)-321-456-733</strong>
            <p>
              <PhoneOutlined /> CALL US FREE
            </p>
          </div>
        </Col>
      </Row>
    </div>
  );

  return <div className='right-links'>{guestLinks}</div>;
};

export default RightMenu;
