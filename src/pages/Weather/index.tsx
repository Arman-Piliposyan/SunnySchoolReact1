import { Typography, Box } from '@mui/material';
import 'leaflet/dist/leaflet.css';
import React from 'react';

import { FiveDaysWeatherSection } from './FiveDaysWeatherSection';
import { TodayWeatherSection } from './TodayWeatherSection';
import { useWeather } from './WeatherContext';
import { Map } from './Map';

export const Weather: React.FC = () => {
  const { position } = useWeather();
  return (
    <Box
      sx={{
        flexDirection: 'column',
        display: 'flex',
        height: '100%',
        width: '100%',
        gap: '16px',
      }}
    >
      <Typography fontWeight={700} fontSize={32}>
        Weather
      </Typography>
      <Box
        sx={{
          justifyContent: 'space-between',
          height: 'calc(100% - 64px)',
          display: 'flex',
        }}
      >
        <Box sx={{ flexDirection: 'column', display: 'flex', gap: '16px' }}>
          <TodayWeatherSection />
          {position && <FiveDaysWeatherSection />}
        </Box>
        <Map />
      </Box>
    </Box>
  );
};
