import {Observable} from 'rxjs';
import {Effect, Actions, toPayload} from '@ngrx/effects';
import {TasksActions} from '../_reducers/tasks.actions';
import {TaskSelectService} from './task-select.service';
import {Injectable} from '@angular/core';

@Injectable()
export class TasksEffects {
  @Effect() select: Observable<Actions> = this._actions$
    .ofType(TasksActions.CREATE_AND_SELECT_TASK)
    .map(toPayload)
    .do((payload) => {
      if (payload) {
        this._taskSelector.select(payload);
      }
    });

  constructor(private _taskSelector: TaskSelectService, private _actions$: Actions) {
  }
}
