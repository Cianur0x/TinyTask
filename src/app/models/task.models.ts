export interface ITask {
  title: string;
  taskDone: boolean;
  taskDuration: string;
  deadLine: string;
  startTime: string;
  endingTime: string;
  description: string;

  tag: {
    id: number;
  };

  user: {
    id: number;
  };

  //viewers: [];
}

export interface ITag {
  id: number;
  name: string;
  labelColor: string;
}
