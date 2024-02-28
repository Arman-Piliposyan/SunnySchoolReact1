import {
  BrowserRouter as Router,
  Navigate,
  Routes,
  Route,
} from 'react-router-dom';
import React from 'react';

import { WeatherContextProvider } from '../../pages/Weather/WeatherContext';
import LeeAlgorithmVisualization from '../LeeAlgoritm';
import { VideoPlayer } from '../../pages/VideoPlayer';
import { Dashboard } from '../../pages/Dashboard';
import { PrivateRoute } from '../PrivateRoute';
import { Weather } from '../../pages/Weather';
import { PublicRoute } from '../PublicRoute';
import { SignUp } from '../../pages/SignUp';
import { SignIn } from '../../pages/SignIn';
import { Stream } from '../../pages/Stream';
import { Socket } from '../../pages/Socket';
import { Layout } from '../Layout';

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<PublicRoute />} path="/">
            <Route element={<Navigate to="sign-in" />} path="/" />
            <Route element={<SignIn />} path="sign-in" />
            <Route element={<SignUp />} path="sign-up" />
          </Route>

          <Route
            element={
              <PrivateRoute>
                <Layout />
              </PrivateRoute>
            }
            path="/"
          >
            <Route element={<Dashboard />} path="dashboard" />
            <Route
              element={<LeeAlgorithmVisualization />}
              path="lee-algorithm"
            />
            <Route element={<Stream />} path="stream" />
            <Route element={<Socket />} path="socket" />
            <Route element={<VideoPlayer />} path="video-player" />
            <Route
              element={
                <WeatherContextProvider>
                  <Weather />
                </WeatherContextProvider>
              }
              path="weather"
            />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
