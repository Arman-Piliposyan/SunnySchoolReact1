import { Typography, Box } from '@mui/material';
import { format } from 'date-fns';
import React from 'react';

import { Message } from '../../../types';

type Props = {
  messageItem: Message;
};
const user = localStorage.getItem('user');
export const MessageItem = ({ messageItem }: Props) => {
  const isUserMessage = messageItem.username === user;
  return (
    <Box
      sx={{
        justifyContent: isUserMessage ? 'flex-end' : 'flex-start',
        display: 'flex',
        width: '100%',
      }}
    >
      <Box
        sx={{
          borderRadius: isUserMessage
            ? '24px 24px 0px 24px'
            : '24px 24px 24px 0px',
          backgroundColor: isUserMessage ? 'rgb(25, 118, 210)' : 'grey',
          padding: '8px 16px',
          maxWidth: '250px',
        }}
      >
        <Typography sx={{ wordWrap: 'break-word' }} color={'white'}>
          {messageItem.text}
        </Typography>
        <Box
          sx={{
            flexDirection: isUserMessage ? 'row' : 'row-reverse',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '8px',
            display: 'flex',
            gap: '16px',
          }}
        >
          <Typography textAlign="center" color="white" fontSize={8}>
            {format(new Date(messageItem.date), 'yyyy-MM-dd  HH:MM')}
          </Typography>
          <Typography fontWeight={700} color={'white'} fontSize={12}>
            {isUserMessage ? 'You' : messageItem.username}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
