import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { ITag, ITask } from '../../models/task.models';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private addTaskURL = 'http://localhost:8080/v1/api/tasks/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(
    private httpClient: HttpClient,
    private storageService: StorageService
  ) {}

  postTask(task: ITask) {
    return this.httpClient.post(
      this.addTaskURL,
      JSON.stringify(task),
      this.httpOptions
    );
  }

  postTag(task: ITag) {}
}
