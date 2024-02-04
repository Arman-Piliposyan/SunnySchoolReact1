import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import React from 'react';

import { SignUp } from '../../pages/SignUp';
import { Login } from '../../pages/Login';

// import LeeAlgorithmVisualization from '../LeeAlgoritm';

const router = createBrowserRouter([
  { element: <Login />, path: '/' },
  { element: <SignUp />, path: 'signUp' },
]);

const App = () => {
  return (
    <>
      {/* <LeeAlgorithmVisualization /> */}

      <RouterProvider router={router} />
    </>
  );
};

export default App;
