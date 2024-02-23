import { useEffect, useState } from 'react';

import { signalingProvider } from '../providers/signaling-provider';
import { Messages_Event_Types, Message_Types } from '../constants';
import { Message } from '../types';

export const useMessaging = (): [Message[], (message: Message) => void] => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const sendMessagesOff = signalingProvider.eventEmitter.on(
      Messages_Event_Types.ADD_MESSAGE,
      onNewMessage,
    );
    const loadMessagesOff = signalingProvider.eventEmitter.on(
      Messages_Event_Types.UPDATE_MESSAGES,
      onLoadMessages,
    );

    return () => {
      loadMessagesOff();
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
    signalingProvider.sendMessage(Message_Types.NEW_MESSAGE, message);
  };

  return [messages, sendMessage];
};
