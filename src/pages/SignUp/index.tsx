import { Typography, TextField, Button, Box } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useDispatch, useSelector } from 'react-redux';
import DoneIcon from '@mui/icons-material/Done';
import { useNavigate } from 'react-router';
import React, { useState } from 'react';

import {
  setConfirmPassword,
  signUpInitialState,
  setSignUpState,
  setPassword,
  setEmail,
} from '../../store/signUp-slice';
import {
  confirmPasswordSelector,
  passwordSelector,
  emailSelector,
} from '../../store/signUp-slice/signUp-selectors';
import { signUpPost, usersGet } from '../../services/authorizationService';

export const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const email = useSelector(emailSelector);
  const password = useSelector(passwordSelector);
  const [showSignUpSuccess, setShowSignUpSuccess] = useState(false);
  const [isEmailCorrect, setIsEmailCorrect] = useState(true);
  const confirmPassword = useSelector(confirmPasswordSelector);
  const [confirmPasswordMatch, setConfirmPasswordMatch] = useState(true);

  const validateEmail = (email: string) => {
    // eslint-disable-next-line no-useless-escape
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true;
    }
    return false;
  };

  const handleGoToSignIn = () => {
    navigate('/sign-in');
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isEmailCorrect) {
      setIsEmailCorrect(true);
    }
    dispatch(setEmail(event.target.value));
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!confirmPasswordMatch) {
      setConfirmPasswordMatch(true);
    }
    dispatch(setPassword(event.target.value));
  };

  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (!confirmPasswordMatch) {
      setConfirmPasswordMatch(true);
    }
    dispatch(setConfirmPassword(event.target.value));
  };

  const handleSignUp = async () => {
    if (!validateEmail(email)) {
      setIsEmailCorrect(false);
    }
    if (password !== confirmPassword || !password || !confirmPassword) {
      setConfirmPasswordMatch(false);
      return;
    }

    try {
      const { data } = await usersGet();
      await signUpPost({
        id: data.length + 1,

        password,
        email,
      });
      dispatch(setSignUpState(signUpInitialState));
      setShowSignUpSuccess(true);
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
      {showSignUpSuccess ? (
        <Box
          sx={{
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            display: 'flex',
            gap: '24px',
          }}
        >
          <Typography fontWeight={600} fontSize={44}>
            Success <DoneIcon sx={{ fontSize: '44px', color: 'green' }} />
          </Typography>
          <Button
            startIcon={<ArrowBackIosIcon />}
            onClick={handleGoToSignIn}
            variant="contained"
          >
            Go Sign In
          </Button>
        </Box>
      ) : (
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
            Sign Up
          </Typography>
          <TextField
            helperText={isEmailCorrect ? '' : 'Please provide correct email'}
            onChange={handleEmailChange}
            error={!isEmailCorrect}
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
          <TextField
            helperText={confirmPasswordMatch ? '' : 'Password doesnt match'}
            onChange={handleConfirmPasswordChange}
            error={!confirmPasswordMatch}
            label="Confirm Password*"
            value={confirmPassword}
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
              startIcon={<ArrowBackIosIcon />}
              onClick={handleGoToSignIn}
              variant="contained"
            >
              Go Sign In
            </Button>
            OR
            <Button
              endIcon={<DoneIcon />}
              onClick={handleSignUp}
              variant="contained"
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};
