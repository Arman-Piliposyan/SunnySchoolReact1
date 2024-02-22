import { Socket, io } from 'socket.io-client';

import { Messages_Event_Types, Message_Types } from '../constants';
import EventEmitter from '../helpers/event-emitter';
import { Message } from '../types';

class SignalingProvider {
  private socket: Socket | null = null;
  public eventEmitter: EventEmitter = new EventEmitter();

  private onLoadMessages(messages: Message[]) {
    this.eventEmitter.emit(Messages_Event_Types.UPDATE_MESSAGES, messages);
  }

  private onNewMessage(message: Message) {
    this.eventEmitter.emit(Messages_Event_Types.ADD_MESSAGE, message);
  }

  public init() {
    this.socket = io('http://localhost:3001');
    this.socket.connect();
    this.socket.on(Message_Types.NEW_MESSAGE, this.onNewMessage);
    this.socket.on(Message_Types.LOAD_MESSAGES, this.onLoadMessages);
  }

  public sendMessage(type: string, data: any) {
    if (!this.socket) {
      console.log('Socket is not initialized!');
      return;
    }
    this.socket.emit(type, data);
  }
}

export const signalingProvider = new SignalingProvider();
