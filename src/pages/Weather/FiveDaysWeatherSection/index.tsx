import ThermostatIcon from '@mui/icons-material/Thermostat';
import { Button, Box } from '@mui/material';
import { format } from 'date-fns';
import React from 'react';

import { getWeekWeather } from '../../../services/weatherService';
import { FiveDaysWeather } from './FiveDaysWeather';
import { useWeather } from '../WeatherContext';

export const FiveDaysWeatherSection = () => {
  const { setFiveDaysWeather, fiveDaysWeather, position } = useWeather();

  const handleGetFiveDaysWeather = async () => {
    try {
      const {
        data: { list },
      } = await getWeekWeather(position);
      const fiveDaysWeatherObject = {};
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      const fiveDaysAllData = list.filter((weather) => {
        return (
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          format(new Date(weather.dt_txt), 'yyyy-MM-dd') !==
          format(new Date(), 'yyyy-MM-dd')
        );
      });
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      fiveDaysAllData.forEach((element) => {
        if (
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          !fiveDaysWeatherObject[format(new Date(element.dt_txt), 'yyyy-MM-dd')]
        ) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          fiveDaysWeatherObject[
            format(new Date(element.dt_txt), 'yyyy-MM-dd')
          ] = [];
        }
        if (format(new Date(element.dt_txt), 'HH') === '06') {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          fiveDaysWeatherObject[
            format(new Date(element.dt_txt), 'yyyy-MM-dd')
          ][0] = element;
        }
        if (format(new Date(element.dt_txt), 'HH') === '18') {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          fiveDaysWeatherObject[
            format(new Date(element.dt_txt), 'yyyy-MM-dd')
          ][1] = element;
        }
      });
      setFiveDaysWeather(fiveDaysWeatherObject);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };
  //   useEffect(() => {
  //     handleGetFiveDaysWeather();
  //   }, [position]);

  return (
    <Box sx={{ flexDirection: 'column', display: 'flex', gap: '16px' }}>
      <Button
        onClick={handleGetFiveDaysWeather}
        sx={{ width: 'max-content' }}
        endIcon={<ThermostatIcon />}
        variant="contained"
        color="primary"
      >
        Get Five days Weather
      </Button>
      {fiveDaysWeather && <FiveDaysWeather />}
    </Box>
  );
};
