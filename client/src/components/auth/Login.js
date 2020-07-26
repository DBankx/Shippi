import React, { useState } from 'react';
import { Form, Input, Row, Col, Button, Checkbox } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/auth';
import { Link, Redirect } from 'react-router-dom';

const Login = ({
  loginUser,
  loadDetails,
  auth: { loading, isAuthenticated }
}) => {
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

  // redirect to homepage if user is authenticated
  if (isAuthenticated) {
    return <Redirect to='/' />;
  }

  return (
    <div className='login-box'>
      <div className='container'>
        <Row align='middle' justify='middle' className='login-wrapper'>
          <Col xl={14} lg={12} md={12} xs={0}></Col>
          <Col xl={10} lg={12} md={12} xs={24}>
            <div className='login-area'>
              <h1>Sign In</h1>
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
                  name='username'
                  rules={[
                    {
                      required: true,
                      message: 'Please input your Username!'
                    }
                  ]}
                >
                  <Input
                    prefix={<MailOutlined className='site-form-item-icon' />}
                    placeholder='email'
                    value={email}
                    name='email'
                    onChange={handleChange}
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
                    name='password'
                    value={password}
                    onChange={handleChange}
                  />
                </Form.Item>
                <Form.Item>
                  <Form.Item name='remember' valuePropName='checked' noStyle>
                    <Checkbox>Remember me</Checkbox>
                  </Form.Item>

                  <a className='login-form-forgot' href='#'>
                    Forgot password
                  </a>
                </Form.Item>
                <Form.Item>
                  <Button
                    type='primary'
                    htmlType='submit'
                    className='login-form-button'
                    loading={loading === false ? false : true}
                  >
                    Log in
                  </Button>
                </Form.Item>
                Or <Link to='/register'>register now!</Link>
              </Form>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

const mapState = ({ auth }) => ({
  auth
});

export default connect(mapState, { loginUser })(Login);
