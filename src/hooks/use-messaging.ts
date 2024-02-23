import { useEffect, useState } from 'react';

import { Emitter_Event_Types, Socket_Event_Types } from '../constants';
import { socketProvider } from '../providers/socket-provider';
import { Message } from '../types';

export const useMessaging = (): [Message[], (message: Message) => void] => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const sendMessagesOff = socketProvider.eventEmitter.on(
      Emitter_Event_Types.ADD_MESSAGE,
      onNewMessage,
    );
    const getMessagesOff = socketProvider.eventEmitter.on(
      Emitter_Event_Types.UPDATE_MESSAGES,
      onLoadMessages,
    );

    return () => {
      getMessagesOff();
      sendMessagesOff();
    };
  }, []);

  const onNewMessage = (message: Message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const onLoadMessages = (messages: Message[]) => {
    setMessages(messages);
  };

  const sendMessage = (message: Message) => {
    socketProvider.sendMessage(Socket_Event_Types.NEW_MESSAGE, message);
  };

  return [messages, sendMessage];
};
