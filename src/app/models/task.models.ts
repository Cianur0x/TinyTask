export interface ITask {
  title: string;
  taskDone: boolean;
  taskDuration: string;
  deadLine: string;
  description: string;
  // startTime: Date;
  // endingTime: Date;

  // idTag: number;
  user: {
    id: number;
  };
}

export interface ITag {
  title: string;
  taskDone: boolean;
  taskDuration: string;
  user: number;
}
