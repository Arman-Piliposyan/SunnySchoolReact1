import { TextField, Button, Box } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import React, { useState } from 'react';

import { useMessaging } from '../../hooks/use-messaging';
import { Message } from '../../types';

const user = localStorage.getItem('user');

export const InputBlock = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, sendMessage] = useMessaging();

  const [userMessage, setUserMessage] = useState('');

  const handleChangeUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserMessage(e.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!userMessage) {
      return;
    }

    if (event.key === 'Enter') {
      handleSend();
    }
  };

  const handleSend = () => {
    const message = {
      date: new Date().toISOString(),
      text: userMessage,
      username: user,
    } as Message;

    sendMessage(message);
    setUserMessage('');
  };

  return (
    <Box sx={{ justifyContent: 'space-between', display: 'flex', gap: '8px' }}>
      <TextField
        onChange={handleChangeUrl}
        onKeyDown={handleKeyDown}
        sx={{ width: '100%' }}
        value={userMessage}
        autoComplete="off"
        size="small"
      />
      <Button
        disabled={!userMessage}
        endIcon={<SendIcon />}
        onClick={handleSend}
        variant="contained"
        size="small"
      >
        Send
      </Button>
    </Box>
  );
};
