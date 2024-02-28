import { Player_Event_Types, PLAYER_STATES } from '../constants';
import EventEmitter from '../helpers/event-emitter';

class PlayerProvider {
  private bufferItems: string[] = [];
  public eventEmitter: EventEmitter = new EventEmitter();

  public removeBufferingItem(url: string) {
    const i = this.bufferItems.indexOf(url);

    if (i !== -1) {
      this.bufferItems.splice(i, 1);
      if (this.bufferItems.length === 0) {
        this.eventEmitter.emit(
          Player_Event_Types.STATE_CHANGE,
          PLAYER_STATES.PLAYING,
        );
      }
    }
  }

  public addBufferingItem(url: string) {
    this.bufferItems.push(url);
    this.eventEmitter.emit(
      Player_Event_Types.STATE_CHANGE,
      PLAYER_STATES.PAUSED,
    );
  }

  public play() {
    this.eventEmitter.emit(
      Player_Event_Types.STATE_CHANGE,
      PLAYER_STATES.PLAYING,
    );
  }

  public pause() {
    this.eventEmitter.emit(
      Player_Event_Types.STATE_CHANGE,
      PLAYER_STATES.PAUSED,
    );
  }

  public volume(volume: number) {
    this.eventEmitter.emit(Player_Event_Types.VOLUME, volume);
  }

  public jump(time: number) {
    this.eventEmitter.emit(Player_Event_Types.TIME_UPDATE, time);
  }

  public speed(speed: number) {
    this.eventEmitter.emit(Player_Event_Types.SPEED, speed);
  }

  public forward() {
    this.eventEmitter.emit(Player_Event_Types.FORWARD, 10);
  }

  public rewind() {
    this.eventEmitter.emit(Player_Event_Types.REWIND, 10);
  }
}

export const playerProvider = new PlayerProvider();
