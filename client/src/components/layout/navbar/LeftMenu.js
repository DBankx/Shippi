import React, { useState } from 'react';
import { Drawer, Button, Divider } from 'antd';
import {
  UnorderedListOutlined,
  SettingOutlined,
  LockOutlined,
  BulbOutlined,
  UserOutlined,
  PoweroffOutlined,
  AccountBookOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../../actions/auth';

function LeftMenu({ auth: { isAuthenticated, loading, user }, logout }) {
  const [visible, setVisible] = useState(false);

  function showDrawer() {
    setVisible(true);
  }

  function onClose() {
    setVisible(false);
  }

  const placement = 'left';

  const authHelpLinks = (
    <div className='authLinks'>
      <p>
        <Link to='/account'>
          <UserOutlined /> Your Account
        </Link>
      </p>
      <p>
        <Link to='/account'>
          <AccountBookOutlined /> Orders
        </Link>
      </p>
      <p>
        <Link to='/account'>
          <SettingOutlined /> Settings
        </Link>
      </p>
      <p>
        <Link onClick={() => logout()}>
          <PoweroffOutlined /> Log out
        </Link>
      </p>
    </div>
  );

  const guestHelpLinks = (
    <div className='guestLinks'>
      <p>
        <UserOutlined /> Your Account
      </p>
      <p>
        <SettingOutlined /> Settings
      </p>
      <p>
        <BulbOutlined /> About Shippi
      </p>
      <p>
        <LockOutlined /> Sign In
      </p>
    </div>
  );

  return (
    <div className='left-menu'>
      <Button
        type='primary'
        onClick={showDrawer}
        style={{ fontSize: '20px', height: '50px', width: '50px' }}
      >
        <UnorderedListOutlined />
      </Button>
      <Drawer
        title='SHOP BY CATEGORY'
        placement={placement}
        closable={true}
        onClose={onClose}
        visible={visible}
        key={placement}
      >
        <p>All Departments</p>
        <p>Arts & Craft</p>
        <p>Automotive</p>
        <p>Technology</p>
        <p>Books</p>
        <p>Electronics</p>
        <p>Fashion </p>
        <p>Home & Kitchen</p>
        <p>Toys & Games</p>
        <p>Video Games</p>
        <p>Health</p>
        <p>Tools</p>

        <Divider />
        <div className='bottom'>
          <h3>HELP & SETTINGS</h3>
          {loading === false && isAuthenticated && user !== null
            ? authHelpLinks
            : guestHelpLinks}
        </div>
      </Drawer>
    </div>
  );
}

const mapState = ({ auth }) => ({
  auth
});

export default connect(mapState, { logout })(LeftMenu);
