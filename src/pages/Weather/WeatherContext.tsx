import React, { createContext, useContext, useEffect, useState } from 'react';

import { PositionType } from './types';

type CreateNodeContextType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [propKey: string]: any;
};

const WeatherContext = createContext({} as CreateNodeContextType);

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any;
};

export const WeatherContextProvider = ({ children }: Props): JSX.Element => {
  const [position, setPosition] = useState<PositionType | null>(null);
  const [weather, setWeather] = useState(null);
  const [fiveDaysWeather, setFiveDaysWeather] = useState(null);
  const [clickMyLocation, setClickMyLocation] = useState<undefined | boolean>(
    undefined,
  );

  const contextData = {
    setFiveDaysWeather,
    setClickMyLocation,
    clickMyLocation,
    fiveDaysWeather,
    setPosition,
    setWeather,
    position,
    weather,
  };

  useEffect(() => {
    setFiveDaysWeather(null);
  }, [position]);

  return (
    <WeatherContext.Provider value={contextData}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => useContext(WeatherContext);
