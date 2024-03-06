export type Message = {
  username: string;
  text: string;
  date: Date;
};

export type VideoDataType = {
  description: string;
  subtitle: string;
  sources: string;
  thumb: string;
  title: string;
};

export type AskMessageModel = {
  userId: string;
  i: number;
  j: number;
};

export type AnswerMessageModel = {
  answerType: string;
  userId: string;
};
