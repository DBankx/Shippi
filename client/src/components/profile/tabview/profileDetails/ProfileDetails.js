import React from 'react';
import { Descriptions } from 'antd';
import {
  TwitterOutlined,
  AmazonOutlined,
  InstagramOutlined,
  FacebookFilled,
  YoutubeOutlined
} from '@ant-design/icons';
import Moment from 'react-moment';
import Address from './Address';

const ProfileDetails = ({ profile, user }) => {
  return (
    <div>
      <Descriptions title='Contact Information'>
        <Descriptions.Item label='Name'>
          {profile.user.firstName + ' ' + profile.user.lastName}
        </Descriptions.Item>
        <Descriptions.Item label='Email'>
          {profile.user.email}
        </Descriptions.Item>
        <Descriptions.Item label='Alternative Email'>
          {profile.contactInformation &&
          profile.contactInformation.alternativeEmail
            ? profile.contactInformation.alternativeEmail
            : 'None'}
        </Descriptions.Item>
        <Descriptions.Item label='Personal Website'>
          {profile.website ? (
            <a href={profile.website} target='_blank' rel='noopener noreferrer'>
              {profile.website}
            </a>
          ) : (
            'None'
          )}
        </Descriptions.Item>
        <Descriptions.Item label='Status'>{profile.status}</Descriptions.Item>
        <Descriptions.Item label='Bio'>
          {profile.bio ? profile.bio : 'None'}
        </Descriptions.Item>
        <Descriptions.Item label='Fax'>
          {profile.contactInformation && profile.contactInformation.fax
            ? profile.contactInformation.fax
            : 'None'}
        </Descriptions.Item>
        <Descriptions.Item label='Mobile'>
          {profile.contactInformation && profile.contactInformation.mobile
            ? profile.contactInformation.mobile
            : 'None'}
        </Descriptions.Item>
        <Descriptions.Item label='Social Links'>
          {profile.socials && profile.socials.twitter ? (
            <a
              href={profile.socials.twitter}
              target='_blank'
              rel='noopener noreferrer'
            >
              <TwitterOutlined style={{ fontSize: '20px', color: '#0e6cff' }} />
            </a>
          ) : null}
          {'  '}
          {profile.socials && profile.socials.amazon ? (
            <a
              href={profile.socials.amazon}
              target='_blank'
              rel='noopener noreferrer'
            >
              <AmazonOutlined style={{ fontSize: '20px', color: '#000' }} />
            </a>
          ) : null}
          {'  '}
          {profile.socials && profile.socials.instagram ? (
            <a
              href={profile.socials.instagram}
              target='_blank'
              rel='noopener noreferrer'
            >
              <InstagramOutlined
                style={{ fontSize: '20px', color: '#DD2A7B' }}
              />
            </a>
          ) : null}
          {'  '}
          {profile.socials && profile.socials.facebook ? (
            <a
              href={profile.socials.facebook}
              target='_blank'
              rel='noopener noreferrer'
            >
              <FacebookFilled style={{ fontSize: '20px', color: '#3B5998' }} />
            </a>
          ) : null}
          {'  '}
          {profile.socials && profile.socials.Youtube ? (
            <a
              href={profile.socials.Youtube}
              target='_blank'
              rel='noopener noreferrer'
            >
              <YoutubeOutlined style={{ fontSize: '20px', color: '#c4302b' }} />
            </a>
          ) : null}
        </Descriptions.Item>
      </Descriptions>
      <Descriptions title='Company Information' style={{ marginTop: '2em' }}>
        <Descriptions.Item label='company Name'>
          {profile.companyName ? profile.companyName : 'None'}
        </Descriptions.Item>
        <Descriptions.Item label='Company Website'>
          {profile.companyInfo && profile.companyInfo.officialWebsite ? (
            <a
              href={profile.companyInfo.officialWebsite}
              target='_blank'
              rel='noopener noreferrer'
            >
              {profile.companyInfo.officialWebsite}
            </a>
          ) : (
            'None'
          )}
        </Descriptions.Item>
        <Descriptions.Item label='Year Established'>
          {profile.companyInfo && profile.companyInfo.yearEstablished ? (
            <Moment format='YYYY-MM-DD'>
              {profile.companyInfo.yearEstablished}
            </Moment>
          ) : (
            'None'
          )}
        </Descriptions.Item>
        <Descriptions.Item label='Business Type'>
          {profile.companyInfo && profile.companyInfo.businessType
            ? profile.companyInfo.businessType
            : 'None'}
        </Descriptions.Item>
        <Descriptions.Item label='Registered Address'>
          {profile.companyInfo && profile.companyInfo.registeredAddress
            ? profile.companyInfo.registeredAddress
            : 'None'}
        </Descriptions.Item>
        <Descriptions.Item label='About Company'>
          {profile.companyInfo && profile.companyInfo.aboutCompany
            ? profile.companyInfo.aboutCompany
            : 'None'}
        </Descriptions.Item>
      </Descriptions>
      {user && user._id === profile.user._id ? (
        <Address address={profile.addresses} />
      ) : null}
    </div>
  );
};

export default ProfileDetails;
