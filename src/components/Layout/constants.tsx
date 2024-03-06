import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import CloudSyncIcon from '@mui/icons-material/CloudSync';
import LightModeIcon from '@mui/icons-material/LightMode';
import TheatersIcon from '@mui/icons-material/Theaters';
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
    icon: <LightModeIcon sx={{ fontSize: '20px' }} />,
    route: '/weather',
    name: 'Weather',
    id: '3',
  },
  {
    icon: <CompareArrowsIcon sx={{ fontSize: '20px' }} />,
    route: '/socket',
    name: 'Socket',
    id: '4',
  },
  {
    icon: <VideoLibraryIcon sx={{ fontSize: '20px' }} />,
    route: '/video-player',
    name: 'Video Player',
    id: '5',
  },
  {
    icon: <TheatersIcon sx={{ fontSize: '20px' }} />,
    route: '/movies',
    name: 'Movies',
    id: '6',
  },
  {
    icon: <VideogameAssetIcon sx={{ fontSize: '20px' }} />,
    name: 'Sea-Battle',
    route: '/game',
    id: '6',
  },
];
