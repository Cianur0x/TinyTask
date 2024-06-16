import { IFriend } from './friend.models';

export interface ITask {
  id: number;
  title: string;
  taskDone: boolean;
  taskDuration: string;
  deadLine: string;
  startTime: string;
  endingTime: string;
  description: string;

  tag: {
    id: number;
    name: string;
    labelColor: string;
  };

  user: {
    id: number;
  };

  viewers: IFriend[];
}

export interface ITag {
  id: number;
  name: string;
  labelColor: string;
  userId: number;
}

export interface ITagBack {
  id: number;
  name: string;
  labelColor: string;
  user: {
    id: number;
  };
}
