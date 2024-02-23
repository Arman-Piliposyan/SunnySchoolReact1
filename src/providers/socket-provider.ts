/* eslint-disable no-console */
import { Socket, io } from 'socket.io-client';

import { Emitter_Event_Types, Socket_Event_Types } from '../constants';
import EventEmitter from '../helpers/event-emitter';
import { Message } from '../types';

class SocketProvider {
  private onLoadMessages = (messages: Message[]) => {
    this.eventEmitter.emit(Emitter_Event_Types.UPDATE_MESSAGES, messages);
  };

  private onNewMessage = (message: Message) => {
    this.eventEmitter.emit(Emitter_Event_Types.ADD_MESSAGE, message);
  };

  private socket: Socket | null = null;

  public eventEmitter: EventEmitter = new EventEmitter();

  constructor(private url: string) {
    this.socket = io(url, {
      transports: ['websocket', 'polling'],
    });
  }

  public init() {
    if (!this.socket) {
      console.log('Connection Error');
      return;
    }
    this.socket.connect();
    this.socket.on(Socket_Event_Types.NEW_MESSAGE, this.onNewMessage);
    this.socket.on(Socket_Event_Types.LOAD_MESSAGES, this.onLoadMessages);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public sendMessage(type: string, data: any) {
    if (!this.socket) {
      console.log('Connection Error');
      return;
    }
    this.socket.emit(type, data);
  }
}

export const socketProvider = new SocketProvider('http://localhost:3001');
