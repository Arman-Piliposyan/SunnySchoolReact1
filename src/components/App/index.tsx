import {
  BrowserRouter as Router,
  Navigate,
  Routes,
  Route,
} from 'react-router-dom';
import React from 'react';

// import LeeAlgorithmVisualization from '../LeeAlgoritm';
import { SignUp } from '../../pages/SignUp';
import { SignIn } from '../../pages/SignIn';

const App = () => {
  return (
    <>
      {/* <LeeAlgorithmVisualization /> */}
      <Router>
        <Routes>
          <Route element={<Navigate to="/sign-in" replace />} path="/" />
          <Route element={<SignIn />} path="sign-in" />
          <Route element={<SignUp />} path="sign-up" />
          <Route element={<div>dashboard</div>} path="dashboard" />
        </Routes>
      </Router>
    </>
  );
};

export default App;
