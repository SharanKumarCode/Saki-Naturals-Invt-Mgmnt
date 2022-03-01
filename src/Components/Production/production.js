import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { MdAddBox, MdHistoryToggleOff, MdHistory, MdScheduleSend } from "react-icons/md";
import { AiOutlineSchedule } from "react-icons/ai";

import Update from './Update/update';
import History from './History/history';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function production() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '95%', position: "absolute", left: "6vw" }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} 
        onChange={handleChange} 
        aria-label="basic tabs example" 
        centered
        sx={
            {
                background: "#F0F0F0",
            }
        }
        textColor="secondary"
        indicatorColor="secondary">
          <Tab icon={<MdAddBox size={"2em"}/>} iconPosition="end" label="UPDATE" {...a11yProps(0)} />
          <Tab icon={<MdHistoryToggleOff size={"2em"}/>} iconPosition="end" label="HISTORY" {...a11yProps(1)} />
          <Tab icon={<AiOutlineSchedule size={"2em"}/>} iconPosition="end" label="SCHEDULE" {...a11yProps(2)} />
          <Tab icon={<MdHistory size={"2em"}/>} iconPosition="end" label="SCHEDULE HISTORY" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Update />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <History />
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item Four
      </TabPanel>
    </Box>
  );
}
