import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Typography, TextField, Button, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import DoneIcon from '@mui/icons-material/Done';
import { useNavigate } from 'react-router';
import React, { useState } from 'react';

import {
  signInPasswordSelector,
  signInEmailSelector,
} from '../../store/signIn-slice/signIn-selectors';
import {
  setSignInState,
  setPassword,
  setEmail,
} from '../../store/signIn-slice';
import { usersGet } from '../../services/authorizationService';

export const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const email = useSelector(signInEmailSelector);
  const password = useSelector(signInPasswordSelector);

  const [isEmailCorrect, setIsEmailCorrect] = useState(true);
  const [noCredentials, setNoCredentials] = useState(false);
  // const [showSignUpSuccess, setShowSignUpSuccess] = useState(false);
  // const [confirmPasswordMatch, setConfirmPasswordMatch] = useState(true);

  const handleGoToSignUp = () => {
    dispatch(setSignInState());
    navigate('/sign-up');
  };

  const validateEmail = (email: string) => {
    // eslint-disable-next-line no-useless-escape
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true;
    }
    return false;
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isEmailCorrect) {
      setIsEmailCorrect(true);
    }
    if (noCredentials) {
      setNoCredentials(false);
    }
    dispatch(setEmail(event.target.value));
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (noCredentials) {
      setNoCredentials(false);
    }
    dispatch(setPassword(event.target.value));
  };

  const handleSignIn = async () => {
    if (!validateEmail(email)) {
      setIsEmailCorrect(false);
    }

    try {
      const { data } = await usersGet();
      const findUser = data.find(
        (user: { password: string; email: string }) => {
          return user.email === email && user.password === password;
        },
      );
      if (!findUser) {
        setNoCredentials(true);
        return;
      }
      dispatch(setSignInState());
      localStorage.setItem('token', findUser.token);
      localStorage.setItem('user', findUser.email);
      navigate('/dashboard');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  return (
    <Box
      sx={{
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        display: 'flex',
        width: '100%',
      }}
    >
      {
        <Box
          sx={{
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            display: 'flex',
            width: '400px',
            gap: '24px',
          }}
        >
          <Typography fontWeight={600} fontSize={24}>
            Sign In
          </Typography>
          <TextField
            helperText={
              isEmailCorrect
                ? noCredentials
                  ? 'No Credentials'
                  : ''
                : 'Please provide correct email'
            }
            error={!isEmailCorrect || noCredentials}
            onChange={handleEmailChange}
            label="Email*"
            value={email}
            size="small"
            fullWidth
          />
          <TextField
            onChange={handlePasswordChange}
            label="Password*"
            value={password}
            type="password"
            size="small"
            fullWidth
          />
          <Box
            sx={{
              justifyContent: 'space-between',
              alignItems: 'center',
              display: 'flex',
              width: '100%',
              gap: '6px',
            }}
          >
            <Button
              endIcon={<DoneIcon />}
              onClick={handleSignIn}
              variant="contained"
            >
              Sign In
            </Button>
            OR
            <Button
              endIcon={<ArrowForwardIosIcon />}
              onClick={handleGoToSignUp}
              variant="contained"
              color="secondary"
            >
              Go Sign Up
            </Button>
          </Box>
        </Box>
      }
    </Box>
  );
};
