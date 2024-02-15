import { MapContainer, TileLayer } from 'react-leaflet';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

import { LocationMarker } from './LocationMarker';
import { useWeather } from '../WeatherContext';

export const Map = () => {
  const { position } = useWeather();

  return (
    <Box
      sx={{
        flexDirection: 'column',
        alignItems: 'center',
        display: 'flex',
        gap: '16px',
      }}
    >
      <Typography fontWeight={700} fontSize={22}>
        Choose any location
      </Typography>
      <Box
        sx={{
          borderRadius: '8px',
          overflow: 'hidden',
          height: '500px',
          width: '500px',
        }}
      >
        <MapContainer
          center={position || { lat: 40.177516, lng: 44.512638 }}
          style={{ height: '500px', width: '100%' }}
          zoom={13}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <LocationMarker />
        </MapContainer>
      </Box>
    </Box>
  );
};
