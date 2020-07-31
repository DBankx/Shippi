import React, { useState, useEffect } from 'react';
import { Button, Input, Form, Divider, Select, Switch, DatePicker } from 'antd';
import {
  TwitterOutlined,
  InstagramOutlined,
  YoutubeOutlined,
  FacebookOutlined,
  AmazonOutlined,
  EditOutlined
} from '@ant-design/icons';
import { getMyProfile } from '../../../actions/profile';
import { connect } from 'react-redux';
import { editProfile } from '../../../actions/profile';
import { withRouter } from 'react-router-dom';

const { Option } = Select;
const { TextArea } = Input;

const EditProfile = ({
  getMyProfile,
  profile: { profile },
  editProfile,
  history
}) => {
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

  useEffect(() => {
    getMyProfile();

    setFormData({
      companyName: profile && profile.companyName ? profile.companyName : '',
      website: profile && profile.website ? profile.website : '',
      bio: profile && profile.bio ? profile.bio : '',
      storeLocation:
        profile && profile.storeLocation ? profile.storeLocation : '',
      youtube:
        profile && profile.socials && profile.socials.youtube
          ? profile.socials.youtube
          : '',
      amazon:
        profile && profile.socials && profile.socials.amazon
          ? profile.socials.amazon
          : '',
      instagram:
        profile && profile.socials && profile.socials.instagram
          ? profile.socials.instagram
          : '',
      facebook:
        profile && profile.socials && profile.socials.facebook
          ? profile.socials.facebook
          : '',
      twitter:
        profile && profile.socials && profile.socials.twitter
          ? profile.socials.twitter
          : '',
      fax:
        profile && profile.contactInformation && profile.contactInformation.fax
          ? profile.contactInformation.fax
          : '',
      mobile:
        profile &&
        profile.contactInformation &&
        profile.contactInformation.mobile
          ? profile.contactInformation.mobile
          : '',
      alternativeEmail:
        profile &&
        profile.contactInformation &&
        profile.contactInformation.alternativeEmail
          ? profile.contactInformation.alternativeEmail
          : '',
      officialWebsite:
        profile && profile.companyInfo && profile.companyInfo.officialWebsite
          ? profile.companyInfo.officialWebsite
          : '',
      businessType:
        profile && profile.companyInfo && profile.companyInfo.businessType
          ? profile.companyInfo.businessType
          : '',
      registeredAddress:
        profile && profile.companyInfo && profile.companyInfo.registeredAddress
          ? profile.companyInfo.registeredAddress
          : '',
      aboutCompany:
        profile && profile.companyInfo && profile.companyInfo.aboutCompany
          ? profile.companyInfo.aboutCompany
          : ''
    });
  }, [getMyProfile]);

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

  const tailFormItemLayout = {
    wrapperCol: {
      sm: {
        span: 16,
        offset: 8
      }
    }
  };

  //   handle the status
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

  const [socials, setSocials] = useState(false);
  const [company, setCompany] = useState(false);
  const [yearEstablished, setYearEstablished] = useState('');
  //   handle the date
  function handleDate(date, dateString) {
    setYearEstablished(dateString);
  }

  // package all the data
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
    bio
  };

  return (
    <div className='container edit-profile'>
      <h1 style={{ textAlign: 'center', marginTop: '1em' }}>
        Edit your Profile
      </h1>
      <Form
        {...tailLayout}
        initialValues={{ remember: true }}
        onFinish={() => editProfile(profileData, history, true)}
      >
        <Divider orientation='left'>Contact Information</Divider>
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

        <Form.Item label='Add company'>
          <Switch onClick={() => setCompany(!company)} />
        </Form.Item>
        {company ? (
          <div className='company'>
            <Divider orientation='left'>Company Information</Divider>
            <Form.Item hasFeedback name='companyName' label='Company Name'>
              <Input
                value={companyName}
                name='companyName'
                type='text'
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item
              hasFeedback
              name='yearEstablished'
              label='Year Established'
            >
              <DatePicker
                name='yearEstablished'
                value={yearEstablished}
                onChange={handleDate}
              />
            </Form.Item>
            <Form.Item
              hasFeedback
              name='officialWebsite'
              label='company Website'
            >
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
        ) : null}

        <Form.Item label='Add socials'>
          <Switch onClick={() => setSocials(!socials)} />
        </Form.Item>
        {socials ? (
          <div className='socials'>
            <Divider orientation='left'>Socials</Divider>
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
        ) : null}
        <Form.Item {...tailFormItemLayout}>
          <Button
            type='primary'
            htmlType='submit'
            className='edit'
            icon={<EditOutlined />}
          >
            Edit Profile
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

const mapState = ({ profile }) => ({
  profile
});

export default connect(mapState, { getMyProfile, editProfile })(
  withRouter(EditProfile)
);
