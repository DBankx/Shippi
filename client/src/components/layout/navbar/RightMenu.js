import React, { useState } from 'react';
import {
  Row,
  Col,
  Button,
  Tooltip,
  Popover,
  Input,
  Form,
  Checkbox
} from 'antd';
import {
  ShoppingCartOutlined,
  UserOutlined,
  LockOutlined,
  PhoneOutlined,
  MailOutlined
} from '@ant-design/icons';

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

  // const contactDetails = (

  // )

  const guestLinks = (
    <div className='top-links'>
      <Row align='middle'>
        <Col xs={0} xl={4} lg={8} md={12}>
          <Popover content={loginMenu} placement='bottomRight'>
            <Button type='link'>
              <UserOutlined />
            </Button>
          </Popover>
        </Col>
        <Col span={4} xs={24} xl={4} lg={8} md={12}>
          <Tooltip placement='bottom' title={<span>Login to use cart</span>}>
            <Button type='link'>
              <ShoppingCartOutlined />
            </Button>
          </Tooltip>
        </Col>
        <Col xs={0} xl={4} lg={8} md={0}>
          <Popover placement='bottomRight'>
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
