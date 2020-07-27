import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ProfileDetails from './profileDetails/ProfileDetails';

import 'react-tabs/style/react-tabs.css';
const TabView = ({ profile }) => {
  return (
    <div>
      <Tabs>
        <TabList className='tab-list'>
          <Tab selectedClassName='active'>Profile</Tab>
          {profile.user.role !== 'Buyer' ? (
            <Tab selectedClassName='active'>Inventory</Tab>
          ) : null}
          <Tab selectedClassName='active'>Orders</Tab>
          <Tab selectedClassName='active'>Feedback</Tab>
        </TabList>
        <TabPanel>
          <ProfileDetails profile={profile} />
        </TabPanel>
        {profile.user.role !== 'Buyer' ? (
          <TabPanel>This is Inventory</TabPanel>
        ) : null}

        <TabPanel>This is orders</TabPanel>
        <TabPanel>This is feedback</TabPanel>
      </Tabs>
    </div>
  );
};

export default TabView;
