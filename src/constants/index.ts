export const Socket_Event_Types = {
  LOAD_MESSAGES: 'load_messages',
  NEW_MESSAGE: 'new_message',
};

export const Emitter_Event_Types = {
  UPDATE_MESSAGES: 'update_messages',
  ADD_MESSAGE: 'add_message',
};

export const Player_Event_Types = {
  STATE_CHANGE: 'STATE_CHANGE',
  TIME_UPDATE: 'TIME_UPDATE',
  FORWARD: 'FORWARD',
  REWIND: 'REWIND',
  VOLUME: 'VOLUME',
  SPEED: 'SPEED',
};

export enum PLAYER_STATES {
  PLAYING,
  PAUSED,
}

export const MessageTypes = {
  ANSWER: 'answer',
  ASK: 'ask',
};

export const MessagesEventTypes = {
  ON_ANSWER: 'on_answer',
  ON_ASK: 'on_ask',
};

export const BoardEventTypes = {
  ON_UPDATE: 'on_update',
};

export const BOARD_VALUES = {
  EMPTY: 0,
  SHIP: 1,
  MISS: 2,
};

export const AnswerType = {
  MISS: 'MISS',
  KILL: 'KILL',
  HIT: 'HIT',
};
