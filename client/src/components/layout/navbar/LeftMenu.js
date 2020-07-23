import React, { useState } from 'react';
import { Drawer, Button, Divider } from 'antd';
import {
  UnorderedListOutlined,
  SettingOutlined,
  LockOutlined,
  BulbOutlined,
  UserOutlined
} from '@ant-design/icons';

function LeftMenu(props) {
  const [visible, setVisible] = useState(false);

  function showDrawer() {
    setVisible(true);
  }

  function onClose() {
    setVisible(false);
  }

  const placement = 'left';

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
        closable={false}
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
      </Drawer>
    </div>
  );
}

export default LeftMenu;
