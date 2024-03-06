import { BoardEventTypes, AnswerType } from '../../constants';
import EventEmitter from '../../helpers/event-emitter';

class EnemyBoardProvider {
  private board: number[][] = [];
  public eventEmitter: EventEmitter = new EventEmitter();

  private render() {
    this.eventEmitter.emit(BoardEventTypes.ON_UPDATE, this.board);
  }

  public setAnswer(answerType: string) {
    switch (answerType) {
      // TODO: Implement cases
      case AnswerType.MISS: {
        break;
      }
      case AnswerType.HIT: {
        break;
      }
      case AnswerType.KILL: {
        break;
      }
    }
    this.render();
  }

  public init() {
    for (let i = 0; i < 10; i++) {
      this.board[i] = [];
      for (let j = 0; j < 10; j++) {
        this.board[i][j] = 0;
      }
    }
    this.render();
  }
}

export const enemyBoardProvider = new EnemyBoardProvider();
