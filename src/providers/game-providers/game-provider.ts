import { AnswerMessageModel, AskMessageModel } from '../../types';
import { enemyBoardProvider } from './enemy-board-provider';
import { selfBoardProvider } from './self-board-provider';
import { signalingProvider } from './signaling-provider';
import { MessageTypes } from '../../constants';
const user = localStorage.getItem('user');
class GameProvider {
  constructor() {
    signalingProvider.eventEmitter.on(MessageTypes.ASK, this.onAsk);
    signalingProvider.eventEmitter.on(MessageTypes.ANSWER, this.onAnswer);
  }

  private onAnswer({ answerType }: AnswerMessageModel) {
    enemyBoardProvider.setAnswer(answerType);
  }

  private onAsk({ i, j }: AskMessageModel) {
    selfBoardProvider.checkAttack(i, j);
  }

  public ask(i: number, j: number) {
    signalingProvider.sendMessage(MessageTypes.ASK, {
      userId: user as string,
      i,
      j,
    });
  }

  public init() {
    selfBoardProvider.init();
    enemyBoardProvider.init();
  }
}

export const gameProvider = new GameProvider();
