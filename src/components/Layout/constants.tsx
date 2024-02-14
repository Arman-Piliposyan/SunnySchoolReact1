import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import CloudSyncIcon from '@mui/icons-material/CloudSync';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import React from 'react';

export const DrawerMenu = [
  {
    icon: <SpaceDashboardIcon sx={{ fontSize: '20px' }} />,
    route: '/dashboard',
    name: 'Dashboard',
    id: '0',
  },
  {
    icon: <CloudSyncIcon sx={{ fontSize: '20px' }} />,
    route: '/lee-algorithm',
    name: 'Lee Algorithm',
    id: '1',
  },
  {
    icon: <LiveTvIcon sx={{ fontSize: '20px' }} />,
    route: '/stream',
    name: 'Stream',
    id: '2',
  },
  {
    icon: <WbSunnyIcon sx={{ fontSize: '20px' }} />,
    route: '/weather',
    name: 'Weather',
    id: '3',
  },
];
