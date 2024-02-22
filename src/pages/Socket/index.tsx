import { TextField, Button, Box } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { signalingProvider } from '../../providers/signaling-provider';
import { useMessaging } from '../../hooks/use-messaging';
import { Message } from '../../types';

export const Socket = () => {
  const [messages, sendMessage] = useMessaging();

  const [userMessage, setUserMessage] = useState('');

  useEffect(() => {
    signalingProvider.init();
  }, []);

  const handleChangeUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserMessage(e.target.value);
  };

  const handleSend = () => {
    const message = {
      date: new Date().toISOString(),
      text: userMessage,
      username: 'user',
    } as Message;

    sendMessage(message);
    setUserMessage('');
  };
  console.log(messages);

  return (
    <Box sx={{ display: 'flex', gap: '8px' }}>
      <TextField
        onChange={handleChangeUrl}
        sx={{ width: '75%' }}
        value={userMessage}
        autoComplete="off"
        label="Title"
      />
      <Button onClick={handleSend} variant="contained" size="small">
        Send
      </Button>
    </Box>
  );
};
