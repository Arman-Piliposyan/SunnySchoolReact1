import LocationOnIcon from '@mui/icons-material/LocationOn';
import React, { useEffect } from 'react';
import { Button } from '@mui/material';
import { Box } from '@mui/system';

import { getWeather } from '../../../services/weatherService';
import { useWeather } from '../WeatherContext';
import { TodayWeather } from './TodayWeather';

export const TodayWeatherSection = () => {
  const {
    setClickMyLocation,
    clickMyLocation,
    setPosition,
    setWeather,
    position,
    weather,
  } = useWeather();

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      // eslint-disable-next-line no-console
      console.log('Geolocation not supported');
    }
  };

  const success = (position: {
    coords: { longitude: number; latitude: number };
  }) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setClickMyLocation(!clickMyLocation);
    setPosition({ lng: longitude, lat: latitude });
  };

  const error = () => {
    // eslint-disable-next-line no-console
    console.log('Unable to retrieve your location');
  };

  useEffect(() => {
    if (!position) {
      return;
    }
    (async () => {
      try {
        const { data } = await getWeather(position);
        setWeather(data);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    })();
  }, [position]);

  return (
    <Box sx={{ flexDirection: 'column', display: 'flex', gap: '16px' }}>
      <Button
        onClick={handleLocationClick}
        sx={{ width: 'max-content' }}
        endIcon={<LocationOnIcon />}
        variant="contained"
        color="primary"
      >
        Get My Location
      </Button>
      {weather ? (
        <TodayWeather />
      ) : (
        'Please choose location or get your location weather'
      )}
    </Box>
  );
};
