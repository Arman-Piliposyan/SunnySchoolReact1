/* eslint-disable no-console */
import { Socket, io } from 'socket.io-client';

import { Message } from '../types';

class SocketIOClient {
  private socket: Socket;

  constructor(private url: string) {
    this.socket = io(url, {
      transports: ['websocket', 'polling'],
    });
    this.init();
  }

  private onLoadMessage() {
    this.socket.on('load_messages', (messages: Message) => {
      console.log(messages);
    });
  }
  private onMessageSend() {
    this.socket.on('new_message', (message: Message) => {
      console.log(message);
    });
  }

  private init(): void {
    this.onLoadMessage();
    this.onMessageSend();
  }

  public sendMessage(message: string): void {
    this.socket.emit('new_message', { message });
  }

  public disconnect(): void {
    this.socket.disconnect();
  }

  public connect(): void {
    this.socket.connect();
  }
}

export const socket = new SocketIOClient('http://localhost:3001');
