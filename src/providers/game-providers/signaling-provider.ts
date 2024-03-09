/* eslint-disable no-console */
import { Socket, io } from 'socket.io-client';

import { MessagesEventTypes, MessageTypes } from '../../constants';
import { AnswerMessageModel, AskMessageModel } from '../../types';
import EventEmitter from '../../helpers/event-emitter';

class SignalingProvider {
  private socket: Socket | null = null;
  public eventEmitter: EventEmitter = new EventEmitter();

  constructor() {
    this.socket = io('http://localhost:3001', {
      transports: ['websocket', 'polling'],
    });
  }

  private onAnswer(answerData: AnswerMessageModel) {
    this.eventEmitter.emit(MessagesEventTypes.ON_ANSWER, answerData);
  }

  private onAsk(askData: AskMessageModel) {
    this.eventEmitter.emit(MessagesEventTypes.ON_ASK, askData);
  }

  public init() {
    if (!this.socket) {
      console.log('Socket is not initialized!');
      return;
    }
    this.socket.on(MessageTypes.ASK, this.onAsk);
    this.socket.on(MessageTypes.ANSWER, this.onAnswer);
  }

  public sendMessage(type: string, data: AnswerMessageModel | AskMessageModel) {
    if (!this.socket) {
      console.log('Socket is not initialized!');
      return;
    }
    this.socket.emit(type, data);
  }
}

export const signalingProvider = new SignalingProvider();
