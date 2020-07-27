import React, { useEffect, Fragment } from 'react';
import ProfileTop from './profileTop/ProfileTop';
import { connect } from 'react-redux';
import { getProfile } from '../../actions/profile';
import Spinner from '../layout/layoutUtils/Spinner';
import { Row, Col } from 'antd';
import TabView from './tabview/TabView';

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
    <div className='container'>
      {!loading && profile !== null ? (
        <div className='profile-section'>
          <Row align='middle' justify='center' className='profile-box'>
            <Col xl={16} xs={24} lg={18} md={23} sm={24}>
              <ProfileTop profile={profile && profile} />
              <TabView profile={profile && profile} user={user && user} />
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
