import { MapContainer, TileLayer } from 'react-leaflet';
import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import 'leaflet/dist/leaflet.css';

import { getWeather } from '../../services/weatherService';
import { LocationMarker } from './LocationMarker';

export const Weather: React.FC = () => {
  const [position, setPosition] = useState({ lat: 40.177516, lng: 44.512638 });

  useEffect(() => {
    (async () => {
      const { data } = await getWeather();
      console.log(data);
    })();
  }, []);
  console.log(position);

  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      <Box sx={{ overflow: 'hidden', height: '500px', width: '500px' }}>
        <MapContainer
          style={{ height: '500px', width: '100%' }}
          center={position}
          zoom={13}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <LocationMarker setPosition={setPosition} position={position} />
        </MapContainer>
      </Box>
    </Box>
  );
};
