import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {Task} from '../_domains/task';
import {TasksActions} from '../_reducers/tasks.actions';

@Injectable()
export class TasksService {
  tasks$: Observable<Task[]>;

  constructor(private _store: Store<any>) {

    this.tasks$ = this._store.select<Task[]>('tasks');
  }

  createAndSelect(taskName: string) {

    this._store.dispatch({type: TasksActions.CREATE_AND_SELECT_TASK, payload: taskName});
  }
}
