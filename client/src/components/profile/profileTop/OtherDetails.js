import React from 'react';
import Moment from 'react-moment';
import { Button } from 'antd';
import { connect } from 'react-redux';
import { EditOutlined } from '@ant-design/icons';
import { Statistic } from 'antd';
import { LikeOutlined, MailOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const OtherDetails = ({ profile, auth: { user } }) => {
  return (
    <div
      className='other'
      style={{
        position: 'relative',
        height: '100%',
        paddingTop: '1em',
        paddingBottom: '1em'
      }}
    >
      {user === null ||
      profile === null ||
      (user && user._id !== profile.user._id) ? null : (
        <Link to='/edit-profile'>
          <Button
            type='link'
            icon={<EditOutlined />}
            style={{ color: '#89c9b8' }}
          >
            Edit Profile
          </Button>
        </Link>
      )}
      <Statistic
        title='Feedback'
        value={profile.feedback.length}
        prefix={<LikeOutlined />}
        style={{ marginTop: '2em' }}
      />
      {user === null || profile === null || user._id !== profile.user._id ? (
        <Button
          type='primary'
          icon={<MailOutlined />}
          style={{
            backgroundColor: '#89c9b8',
            borderColor: '#89c9b8',
            marginTop: '2.5em'
          }}
        >
          Contact
        </Button>
      ) : null}
      <p style={{ position: 'absolute', bottom: '0' }}>
        Joined Shippi{' '}
        <strong>
          <Moment fromNow>{profile.date}</Moment>
        </strong>
      </p>
    </div>
  );
};

const mapState = ({ auth }) => ({
  auth
});

export default connect(mapState)(OtherDetails);
