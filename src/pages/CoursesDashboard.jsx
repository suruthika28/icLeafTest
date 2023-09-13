import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css'; 
import '../styles/styles.css';
import MainHeader1 from '../components/MainHeader1';
import MainHeader from '../components/MainHeader';
import ELearnDashboard from './ELearnDashboard';
import AssessmentDashboard from './AssessmentDashboard';
import VirtualRoom from './VirtualRoom';

function CoursesDashboard() {
    
  return (
    <div>
     <MainHeader1/>
      <MainHeader/>
       <div>
        <Tabs className="tabs-container">
          <TabList clasName="tabs-tab-list">
            <Tab>E-Learn Dashboard</Tab>
            <Tab>Assessment Dashboard</Tab>
            <Tab>Virtual Room</Tab>
          </TabList>

         <TabPanel>
           <ELearnDashboard/>
         </TabPanel>

         <TabPanel>
          <AssessmentDashboard/>
         </TabPanel>

         <TabPanel>
          <VirtualRoom/>
         </TabPanel>
      </Tabs>
     </div>
    </div>
  )
}

export default CoursesDashboard;

