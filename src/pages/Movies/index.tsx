import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import { movieSelector } from '../../store/movie-slice/movie-selectors';
import { CustomTabPanel } from './CustomTabPanel';
import { MoviesTab } from './MoviesTab';
import { PlayerTab } from './PlayerTab';
import { AdminTab } from './AdminTab';
import { allProps } from './helpers';

export const Movies = () => {
  const [selectedTab, setSelectedTab] = React.useState(0);
  const selectedMovie = useSelector(movieSelector);
  const firstRender = useRef(false);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  useEffect(() => {
    if (!firstRender.current) {
      firstRender.current = true;
      return;
    }
    if (!selectedMovie) {
      if (selectedTab === 2) {
        setSelectedTab(1);
      }
      return;
    }
    if (selectedTab === 1) {
      setSelectedTab(2);
    }
  }, [selectedMovie]);

  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      <Box sx={{ borderColor: 'divider', borderBottom: 1 }}>
        <Tabs onChange={handleChange} value={selectedTab} aria-label="tabs">
          <Tab label="Admin" {...allProps(0)} />
          <Tab label="Movies" {...allProps(1)} />
          <Tab label="Player" {...allProps(1)} disabled={!selectedMovie} />
        </Tabs>
      </Box>
      <CustomTabPanel value={selectedTab} index={0}>
        <AdminTab />
      </CustomTabPanel>
      <CustomTabPanel value={selectedTab} index={1}>
        <MoviesTab />
      </CustomTabPanel>
      <CustomTabPanel value={selectedTab} index={2}>
        <PlayerTab />
      </CustomTabPanel>
    </Box>
  );
};
