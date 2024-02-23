import { Typography, Box } from '@mui/material';
import React, { useEffect } from 'react';

import { socketProvider } from '../../providers/socket-provider';
import { MessagingBlock } from './MessagingBlock';
import { InputBlock } from './InputBlock';

export const Socket = () => {
  useEffect(() => {
    socketProvider.init();
  }, []);

  return (
    <Box
      sx={{
        justifyContent: 'space-between',
        flexDirection: 'column',
        alignItems: 'center',
        display: 'flex',
        height: '100%',
        width: '100%',
        gap: '8px',
      }}
    >
      <Typography fontWeight={700} fontSize={32}>
        Chat
      </Typography>
      <Box
        sx={{
          justifyContent: 'space-between',
          border: '1px solid black',
          backgroundColor: 'white',
          flexDirection: 'column',
          borderRadius: '8px',
          display: 'flex',
          padding: '16px',
          height: '85%',
          width: '75%',
        }}
      >
        <MessagingBlock />
        <InputBlock />
      </Box>
    </Box>
  );
};
