import React, { useState } from 'react';
import { Steps, Button, Form, Input, Select, DatePicker } from 'antd';
import {
  TwitterOutlined,
  InstagramOutlined,
  YoutubeOutlined,
  FacebookOutlined,
  AmazonOutlined,
  ContactsOutlined
} from '@ant-design/icons';

const { Step } = Steps;
const { Option } = Select;
const { TextArea } = Input;

const ProfileSetup = () => {
  // form layout
  const tailLayout = {
    wrapperCol: {
      span: 16,
      offset: 0
    },
    labelCol: {
      span: 6
    }
  };

  const [formData, setFormData] = useState({
    companyName: '',
    bio: '',
    website: '',
    youtube: '',
    amazon: '',
    instagram: '',
    facebook: '',
    twitter: '',
    fax: '',
    mobile: '',
    alternativeEmail: '',
    officialWebsite: '',
    busniessType: '',
    registeredAddress: '',
    aboutCompany: ''
  });

  const [current, setCurrent] = useState(0);

  function next() {
    setCurrent(current + 1);
  }

  function prev() {
    setCurrent(current - 1);
  }

  const [status, setStatus] = useState('');

  function handleStatus(value) {
    setStatus(value);
  }

  function handleChange({ target }) {
    const { value, name } = target;
    setFormData((prevValue) => {
      return {
        ...prevValue,
        [name]: value
      };
    });
  }

  const {
    companyName,
    businessType,
    aboutCompany,
    alternativeEmail,
    amazon,
    officialWebsite,
    website,
    mobile,
    facebook,
    fax,
    instagram,
    twitter,
    youtube,
    bio
  } = formData;

  const [yearEstablished, setYearEstablished] = useState('');

  function handleDate(date, dateString) {
    setYearEstablished(dateString);
  }

  //   setting the form components
  const contactInfo = (
    <div className='setup-box'>
      <Form.Item
        name='status'
        label='status'
        rules={[{ required: true, message: 'Status is Required' }]}
        hasFeedback
      >
        <Select
          name='status'
          value={status}
          onSelect={(value) => handleStatus(value)}
        >
          <Option value='Online'>Online</Option>
          <Option value='Offline'>Offline</Option>
        </Select>
      </Form.Item>
      <Form.Item name='website' label='website' hasFeedback>
        <Input
          type='text'
          name='website'
          value={website}
          onChange={handleChange}
        />
      </Form.Item>
      <Form.Item name='bio' label='bio' hasFeedback>
        <TextArea
          row={4}
          type='text'
          name='bio'
          value={bio}
          onChange={handleChange}
        />
      </Form.Item>
      <Form.Item name='mobile' label='mobile' hasFeedback>
        <Input
          type='text'
          name='mobile'
          value={mobile}
          onChange={handleChange}
        />
      </Form.Item>
      <Form.Item name='fax' label='fax' hasFeedback>
        <Input type='text' name='fax' value={fax} onChange={handleChange} />
      </Form.Item>
      <Form.Item name='alternativeEmail' label='alternativeEmail' hasFeedback>
        <Input
          type='text'
          name='alternativeEmail'
          value={alternativeEmail}
          onChange={handleChange}
        />
      </Form.Item>
    </div>
  );

  const companyInfo = (
    <div className='setup-box'>
      <Form.Item hasFeedback name='companyName' label='Company Name'>
        <Input
          value={companyName}
          name='companyName'
          type='text'
          onChange={handleChange}
        />
      </Form.Item>
      <Form.Item hasFeedback name='yearEstablished' label='Year Established'>
        <DatePicker
          name='yearEstablished'
          value={yearEstablished}
          onChange={handleDate}
        />
      </Form.Item>
      <Form.Item hasFeedback name='officialWebsite' label='company Website'>
        <Input
          value={officialWebsite}
          name='officialWebsite'
          type='text'
          onChange={handleChange}
        />
      </Form.Item>
      <Form.Item hasFeedback name='businessType' label='Business Type'>
        <Input
          value={businessType}
          name='businessType'
          type='text'
          onChange={handleChange}
        />
      </Form.Item>
      <Form.Item hasFeedback name='aboutCompany' label='About Company'>
        <TextArea
          row={4}
          value={aboutCompany}
          name='aboutCompany'
          type='text'
          onChange={handleChange}
        />
      </Form.Item>
    </div>
  );

  const socials = (
    <div className='setup-box'>
      <Form.Item name='twitter' label='twitter' hasFeedback>
        <Input
          prefix={<TwitterOutlined />}
          type='text'
          name='twitter'
          value={twitter}
          onChange={handleChange}
        />
      </Form.Item>
      <Form.Item name='instagram' label='instagram' hasFeedback>
        <Input
          prefix={<InstagramOutlined />}
          type='text'
          name='instagram'
          value={instagram}
          onChange={handleChange}
        />
      </Form.Item>
      <Form.Item name='amazon' label='amazon' hasFeedback>
        <Input
          prefix={<AmazonOutlined />}
          type='text'
          name='amazon'
          value={amazon}
          onChange={handleChange}
        />
      </Form.Item>
      <Form.Item name='youtube' label='youtube' hasFeedback>
        <Input
          prefix={<YoutubeOutlined />}
          type='text'
          name='youtube'
          value={youtube}
          onChange={handleChange}
        />
      </Form.Item>
      <Form.Item name='facebook' label='facebook' hasFeedback>
        <Input
          prefix={<FacebookOutlined />}
          type='text'
          name='facebook'
          value={facebook}
          onChange={handleChange}
        />
      </Form.Item>
    </div>
  );

  //   setting the steps
  const steps = [
    {
      title: 'Setup contact info',
      content: contactInfo
    },
    {
      title: 'Setup company info',
      content: companyInfo
    },
    {
      title: 'Add socials',
      content: socials
    }
  ];

  const profileData = {
    status,
    yearEstablished,
    companyName,
    aboutCompany,
    alternativeEmail,
    amazon,
    officialWebsite,
    website,
    mobile,
    facebook,
    fax,
    instagram,
    twitter,
    youtube,
    bio,
    amazon,
    instagram
  };

  return (
    <div className='container profile-setup'>
      <h1>Setup your profile</h1>
      <Steps current={current}>
        <Step title='Contact Info' />
        <Step title='Company Info' />
        <Step title='Add Socials' />
      </Steps>

      <div className='steps-content'>
        {' '}
        <Form {...tailLayout} onFinish={() => console.log(profileData)}>
          {steps[current].content}{' '}
        </Form>
      </div>
      <div className='steps-actions'>
        {current > 0 && (
          <Button type='primary' onClick={() => prev()}>
            Prev
          </Button>
        )}
        {current < steps.length - 1 && (
          <Button type='primary' onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            type='primary'
            htmlType='submit'
            onClick={() => console.log(profileData)}
          >
            Done
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProfileSetup;
