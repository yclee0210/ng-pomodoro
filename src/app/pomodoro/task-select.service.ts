import { Injectable } from '@angular/core';
import {Store} from '@ngrx/store';
import {TaskSelectActions} from '../_reducers/task-select.actions';
import {Observable} from 'rxjs';
import {Task} from '../_domains/task';

@Injectable()
export class TaskSelectService {
  selectedTask$: Observable<any>;

  constructor(private _store: Store<any>) {
    this.selectedTask$ = this._store.select('selectedTask');
  }

  select(task: Task) {
    this._store.dispatch({type: TaskSelectActions.SELECT, payload: task});
  }

  deselect() {
    this._store.dispatch({type: TaskSelectActions.DESELECT});
  }
}
