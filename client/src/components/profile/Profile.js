import React, { useEffect, Fragment } from 'react';
import ProfileTop from './profileTop/ProfileTop';
import { connect } from 'react-redux';
import { getProfile } from '../../actions/profile';
import Spinner from '../layout/layoutUtils/Spinner';
import { Row, Col } from 'antd';

const Profile = ({
  getProfile,
  match,
  auth: { user },
  profile: { loading, profile }
}) => {
  // get username from the url
  useEffect(() => {
    getProfile(match.params.username);
  }, [getProfile]);
  return (
    <div>
      {!loading && profile !== null ? (
        <div className='profile-section'>
          <Row align='center' justify='center' className='profile-box'>
            <Col span={16}>
              <ProfileTop profile={profile && profile} />
            </Col>
          </Row>
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

const mapState = ({ auth, profile }) => ({
  profile,
  auth
});

export default connect(mapState, { getProfile })(Profile);
