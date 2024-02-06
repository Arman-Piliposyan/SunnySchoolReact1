import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import CloudSyncIcon from '@mui/icons-material/CloudSync';
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
];
