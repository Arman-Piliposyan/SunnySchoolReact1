import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';

import { useMessaging } from '../../../hooks/use-messaging';
import { MessageItem } from './MessageItem';

export const MessagingBlock = () => {
  const [message] = useMessaging();
  const scrollRef = useRef(null);

  useEffect(() => {
    if (!scrollRef.current) {
      return;
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    scrollRef.current.scrollTo({
      behavior: 'smooth',
      top: 20000,
    });
  }, [message]);

  return (
    <Box
      sx={{
        border: '1px solid #00000090',
        height: 'calc(100% - 48px)',
        borderRadius: '4px',
        overflow: 'auto',
        padding: '8px',
        width: '100%',
      }}
      ref={scrollRef}
    >
      <Box
        sx={{
          flexDirection: 'column',
          display: 'flex',
          gap: '8px',
        }}
      >
        {message.map((messageItem, index) => {
          return <MessageItem messageItem={messageItem} key={index} />;
        })}
      </Box>
    </Box>
  );
};
