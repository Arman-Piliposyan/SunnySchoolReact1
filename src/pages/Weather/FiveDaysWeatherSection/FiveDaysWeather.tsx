import { Typography, Box } from '@mui/material';
import React from 'react';

import { useWeather } from '../WeatherContext';

export const FiveDaysWeather = () => {
  const { fiveDaysWeather } = useWeather();

  return (
    <Box sx={{ flexDirection: 'column', display: 'flex', gap: '12px' }}>
      {Object.keys(fiveDaysWeather).map((day) => {
        const weather06 = fiveDaysWeather[day][0];
        const weather18 = fiveDaysWeather[day][1];
        return (
          <Box
            sx={{ alignItems: 'center', display: 'flex', gap: '12px' }}
            key={day}
          >
            <Typography sx={{ marginRight: '6px' }}>{day}</Typography>
            <Box>
              {weather06 && (
                <Box sx={{ alignItems: 'center', display: 'flex', gap: '6px' }}>
                  06:00 -
                  <img
                    src={`http://openweathermap.org/img/wn/${weather06.weather[0].icon}@2x.png`}
                    style={{ height: '35px', width: '35px' }}
                  />
                  <Typography sx={{ marginRight: '6px' }}>
                    {weather06.weather[0].description}
                  </Typography>
                  <Typography sx={{ marginRight: '6px' }}>
                    Temp - {Math.round(weather06.main.temp)} ℃ ,
                  </Typography>
                  <Typography sx={{ marginRight: '6px' }}>
                    Pressure: {weather06.main.pressure}hPa ,
                  </Typography>
                  <Typography sx={{ marginRight: '6px' }}>
                    Wind - {Math.round(weather06.wind.speed * 3.6)} km/h ,
                  </Typography>
                </Box>
              )}
              {weather18 && (
                <Box sx={{ alignItems: 'center', display: 'flex', gap: '6px' }}>
                  18:00 -
                  <img
                    src={`http://openweathermap.org/img/wn/${weather18.weather[0].icon}@2x.png`}
                    style={{ height: '35px', width: '35px' }}
                  />
                  <Typography sx={{ marginRight: '6px' }}>
                    {weather18.weather[0].description}
                  </Typography>
                  <Typography sx={{ marginRight: '6px' }}>
                    Temp - {Math.round(weather18.main.temp)} ℃ ,
                  </Typography>
                  <Typography sx={{ marginRight: '6px' }}>
                    Pressure: {weather18.main.pressure}hPa ,
                  </Typography>
                  <Typography sx={{ marginRight: '6px' }}>
                    Wind - {Math.round(weather18.wind.speed * 3.6)} km/h ,
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};
