import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ProfileDetails from './profileDetails/ProfileDetails';
import Feedback from './feedback/Feedback';

import 'react-tabs/style/react-tabs.css';
const TabView = ({ profile, user }) => {
  return (
    <div>
      <Tabs>
        <TabList className='tab-list'>
          <Tab selectedClassName='active'>Profile</Tab>
          {profile.user.role !== 'Buyer' ? (
            <Tab selectedClassName='active'>Inventory</Tab>
          ) : null}
          {user && user._id === profile.user._id ? (
            <Tab selectedClassName='active'>Orders</Tab>
          ) : null}

          <Tab selectedClassName='active'>Feedback</Tab>
        </TabList>
        <TabPanel>
          <ProfileDetails profile={profile} user={user} />
        </TabPanel>
        {profile.user.role !== 'Buyer' ? (
          <TabPanel>This is Inventory</TabPanel>
        ) : null}
        {user && user._id === profile.user._id ? (
          <TabPanel>This is orders</TabPanel>
        ) : null}
        <TabPanel>
          <Feedback profile={profile} user={user} />
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default TabView;
