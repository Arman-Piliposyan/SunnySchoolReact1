import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

import { useWeather } from '../WeatherContext';

export const TodayWeather = () => {
  const { weather } = useWeather();

  return (
    <Box
      sx={{
        backgroundColor: '#ffffff50',
        border: '1px solid gray',
        alignItems: 'center',
        borderRadius: '12px',
        padding: '2px 12px',
        display: 'flex',
      }}
    >
      <Typography>
        Today in{' '}
        <span
          style={{
            textDecoration: 'underline',
            fontWeight: '600',
          }}
        >
          {weather.name}
        </span>{' '}
      </Typography>
      <img
        src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        style={{ height: '35px', width: '35px' }}
      />
      <Typography sx={{ marginRight: '6px' }}>
        {weather.weather[0].description}
      </Typography>
      <Typography sx={{ marginRight: '6px' }}>
        Temp - {Math.round(weather.main.temp)} ℃ ,
      </Typography>
      <Typography sx={{ marginRight: '6px' }}>
        Pressure: {weather.main.pressure}hPa ,
      </Typography>
      <Typography sx={{ marginRight: '6px' }}>
        Wind - {Math.round(weather.wind.speed * 3.6)} km/h ,
      </Typography>
      <Typography>Humidity: {weather.main.humidity}%</Typography>
    </Box>
  );
};
