import React, { useState } from 'react';
import { connect } from 'react-redux';
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
  TwitterOutlined,
  RedditOutlined,
  InstagramOutlined,
  MailOutlined
} from '@ant-design/icons';
import logo from '../../../images/logo.svg';
import { Link } from 'react-router-dom';
import AuthLinks from './authLinks/AuthLinks';
import { loginUser } from '../../../actions/auth';

const RightMenu = ({ auth: { isAuthenticated, user, loading }, loginUser }) => {
  const [visible, setVisible] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prevValue) => {
      return {
        ...prevValue,
        [name]: value
      };
    });
  }

  const { email, password } = formData;

  const loginMenu = (
    <div className='login'>
      <h2>Sign In</h2>
      <Form
        name='normal_login'
        className='login-form'
        initialValues={{
          remember: true
        }}
        onFinish={() => {
          loginUser(email, password);
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
            prefix={<MailOutlined className='site-form-item-icon' />}
            placeholder='Email'
            value={email}
            onChange={handleChange}
            name='email'
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
          <Input.Password
            prefix={<LockOutlined className='site-form-item-icon' />}
            type='password'
            placeholder='Password'
            value='password'
            onChange={handleChange}
            name='password'
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
            loading={loading ? true : false}
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
      <div>
        <p>Find us:</p>
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
      </div>
      <Button type='primary'>Send a Request</Button>
    </div>
  );

  const guestLinks = (
    <div className='top-links'>
      <Row align='middle' justify='space-between'>
        <Col xs={0} xl={4} lg={8} md={12}>
          <Popover content={loginMenu} placement='bottomRight'>
            <UserOutlined style={{ fontSize: '1.5rem' }} />
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
            <Badge count={0} showZero>
              <ShoppingCartOutlined style={{ fontSize: '1.5rem' }} />
            </Badge>
          </Tooltip>
        </Col>
        <Col xs={0} xl={4} lg={8} md={0}>
          <Popover placement='bottomRight' content={contactDetails}>
            <MailOutlined style={{ fontSize: '1.5rem' }} />
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

  const authLinks = <AuthLinks />;

  // check if a user is loaded and render the right navbar
  return (
    <div className='right-links'>
      {loading === false && isAuthenticated && user !== null
        ? authLinks
        : guestLinks}
    </div>
  );
};

const mapState = ({ auth }) => ({
  auth
});

export default connect(mapState, { loginUser })(RightMenu);
