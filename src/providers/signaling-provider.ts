/* eslint-disable no-console */
import { Socket, io } from 'socket.io-client';

import { Messages_Event_Types, Message_Types } from '../constants';
import EventEmitter from '../helpers/event-emitter';
import { Message } from '../types';

class SignalingProvider {
  private onLoadMessages = (messages: Message[]) => {
    this.eventEmitter.emit(Messages_Event_Types.UPDATE_MESSAGES, messages);
  };
  private onNewMessage = (message: Message) => {
    this.eventEmitter.emit(Messages_Event_Types.ADD_MESSAGE, message);
  };

  private socket: Socket | null = null;

  public eventEmitter: EventEmitter = new EventEmitter();
  public init() {
    this.socket = io('http://localhost:3001', {
      transports: ['websocket', 'polling'],
    });
    this.socket.connect();
    this.socket.on(Message_Types.NEW_MESSAGE, this.onNewMessage);
    this.socket.on(Message_Types.LOAD_MESSAGES, this.onLoadMessages);
    this.connectUser();
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public sendMessage(type: string, data: any) {
    if (!this.socket) {
      console.log('Socket is not initialized!');
      return;
    }
    this.socket.emit(type, data);
  }

  public connectUser() {
    this.socket?.emit('connectedUser', JSON.stringify({ user: 'brman' }));
  }
}

export const signalingProvider = new SignalingProvider();
