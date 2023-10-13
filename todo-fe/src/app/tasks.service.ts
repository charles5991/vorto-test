import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable, from } from 'rxjs';

const BASE_URL = 'http://localhost:8080/';

const httpOptions = {
  headers: {
    'Content-Type': 'application/json',
  },
};

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  getAllTasks(): Observable<any> {
    return from(axios.get(`${BASE_URL}api/task`, httpOptions));
  }

  createTask(task: any): Observable<any> {
    return from(axios.post(`${BASE_URL}api/task`, task, httpOptions));
  }

  markTaskAsComplete(taskId: string): Observable<any> {
    return from(
      axios.put(`${BASE_URL}api/task/${taskId}/complete`, {}, httpOptions)
    );
  }

  markTaskAsIncomplete(taskId: string): Observable<any> {
    return from(
      axios.put(`${BASE_URL}api/task/${taskId}/incomplete`, {}, httpOptions)
    );
  }

  updateTask(taskId: string, updatedTask: any): Observable<any> {
    return from(
      axios.put(
        `${BASE_URL}api/task/${taskId}/update`,
        updatedTask,
        httpOptions
      )
    );
  }

  deleteTask(taskId: string): Observable<any> {
    return from(
      axios.delete(`${BASE_URL}api/deleteTask/${taskId}`, httpOptions)
    );
  }

  deleteAllTasks(): Observable<any> {
    return from(axios.delete(`${BASE_URL}api/deleteAllTask`, httpOptions));
  }
}
