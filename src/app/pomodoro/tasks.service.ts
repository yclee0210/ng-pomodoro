import { Injectable } from '@angular/core';
import {Store} from '@ngrx/store';
import {Task} from './task';
import {Observable} from 'rxjs';
import {CREATE_TASK, START_TASK, UPDATE_TASK, COMPLETE_TASK} from '../selected-task.reducer';
import {TaskState} from './task-state.enum';
import * as moment from 'moment';

@Injectable()
export class TasksService {
  selectedTask$: Observable<Task>;

  constructor(private _store: Store<any>) {

    this.selectedTask$ = this._store.select<Task>('selectedTask');
  }

  create(task: Task) {
    this._store.dispatch({type: CREATE_TASK, payload: task});
  }

  play(task: Task) {
    task.duration.start = moment().toISOString();
    task.state = TaskState.PLAYING;

    this._store.dispatch({type: START_TASK, payload: task});
  }

  pause(task: Task) {
    task.pauses.push({start: moment().toISOString(), end: null});
    task.state = TaskState.PAUSED;

    this._store.dispatch({type: UPDATE_TASK, payload: task});
  }

  resume(task: Task) {
    task.pauses[task.pauses.length - 1].end = moment().toISOString();
    task.state = TaskState.PLAYING;

    this._store.dispatch({type: UPDATE_TASK, payload: task});
  }

  complete(task: Task) {
    if (task.state === TaskState.PAUSED) {
      task.duration.end = task.pauses[task.pauses.length - 1].start;
      task.pauses = task.pauses.slice(1);
    }
    else {
      task.duration.end = moment().toISOString();
    }
    task.state = TaskState.COMPLETE;

    this._store.dispatch({type: COMPLETE_TASK, payload: task});
  }
}
