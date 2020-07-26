import React, { useState } from 'react';
import { Form, Button, Input, Select, Radio, Checkbox } from 'antd';
import { setAlert } from '../../actions/alert';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/auth';
import { Redirect } from 'react-router-dom';
import { getNames } from 'country-list';

const { Option } = Select;

const countryNames = getNames();

const Register = ({
  setAlert,
  registerUser,
  auth: { loading, isAuthenticated }
}) => {
  const tailLayout = {
    wrapperCol: {
      span: 16,
      offset: 0
    },
    labelCol: {
      span: 6
    }
  };

  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0
      },
      sm: {
        span: 16,
        offset: 8
      }
    }
  };

  const [formData, setFormData] = useState({
    role: '',
    username: '',
    email: '',
    password: '',
    confirm: '',
    firstName: '',
    lastName: ''
  });

  const [country, getCountry] = useState('');

  function handleCountry({ target }) {
    getCountry(target.value);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prevValue) => {
      return {
        ...prevValue,
        [name]: value
      };
    });
  }

  const {
    role,
    password,
    email,
    username,
    confirm,
    firstName,
    lastName
  } = formData;

  console.log(formData);

  if (isAuthenticated) {
    return <Redirect to='/profile-Setup' />;
  }

  return (
    <div className='register'>
      <div className='container2'>
        <Form
          onFinish={() => {
            if (confirm !== password) {
              setAlert(
                'Password incorrect',
                'Please put in the same password',
                'error'
              );
            } else {
              registerUser({
                email,
                username,
                password,
                firstName,
                lastName,
                role,
                country
              });
            }
          }}
          style={{ margin: '0 auto' }}
          {...tailLayout}
          initialValues={{
            remember: true
          }}
        >
          <h1>Create an Account</h1>
          <Form.Item
            name='country'
            label='Country'
            rules={[{ required: true, message: 'Please add a country' }]}
            hasFeedback
          >
            <Select
              value={country}
              name='country'
              onChange={handleCountry}
              placeholder='Please select a Country'
            >
              {countryNames.map((country) => (
                <option value={country}>{country}</option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label='Please select a role'
            name='role'
            rules={[{ required: true, message: 'Please select a role!' }]}
            hasFeedback
          >
            <Radio.Group name='role' value={role} onChange={handleChange}>
              <Radio value='Buyer'>Buyer</Radio>
              <Radio value='Seller'>Seller</Radio>
              <Radio value='Both'>Both</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label='Username'
            name='username'
            rules={[
              {
                required: true,
                message: ' username is required'
              }
            ]}
            hasFeedback
          >
            <Input
              type='text'
              value={username}
              name='username'
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item
            label='Email'
            name='email'
            rules={[
              {
                required: true,
                message: 'A valid email is required'
              }
            ]}
            hasFeedback
          >
            <Input
              type='text'
              name='email'
              value={email}
              onChange={handleChange}
            />
          </Form.Item>

          <Form.Item
            label='Password'
            name='password'
            rules={[
              {
                required: true,
                message: 'Please input your password!'
              }
            ]}
          >
            <Input.Password
              type='password'
              name='password'
              value={password}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item
            label='Confirm Password'
            name='confirm'
            rules={[
              {
                required: true,
                message: 'Please confirm your password!'
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(
                    'The two passwords that you entered do not match!'
                  );
                }
              })
            ]}
          >
            <Input.Password
              type='password'
              name='confirm'
              value={confirm}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item
            label='First Name'
            name='firstName'
            rules={[
              {
                required: true,
                message: 'First name is required'
              }
            ]}
            hasFeedback
          >
            <Input
              type='text'
              name='firstName'
              value={firstName}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item
            label='Last Name'
            name='lastName'
            rules={[
              {
                required: true,
                message: 'Last name is required'
              }
            ]}
            hasFeedback
          >
            <Input
              type='text'
              value={lastName}
              name='lastName'
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item
            name='agreement'
            valuePropName='checked'
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject('Should accept agreement')
              }
            ]}
            {...tailFormItemLayout}
          >
            <Checkbox>
              I have read the <a href=''>agreement</a>
            </Checkbox>
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button
              type='primary'
              htmlType='submit'
              className='login-form-button'
              loading={loading === false ? false : true}
            >
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

const mapState = ({ auth }) => ({
  auth
});

export default connect(mapState, { setAlert, registerUser })(Register);
