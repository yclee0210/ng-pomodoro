import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {TaskState} from '../_enums/task-state.enum';
import {ObjectState} from '../_enums/object-state.enum';
import {Task} from '../_domains/task';
import {Tasks} from '../_reducers/tasks.reducer';

@Injectable()
export class TasksService {
  tasks$: Observable<Task[]>;

  private _tasks: Task[];
  private tasksSubscription: any;

  constructor(private _store: Store<any>) {

    this.tasks$ = this._store.select<Task[]>('tasks');
    this.tasksSubscription = this.tasks$.subscribe(data => this._tasks = data);
  }

  createAndSelect(taskName: string) {
    let task: Task = {
      id: this._getNextId(),
      name: taskName,
      pomodoros: [],
      taskState: TaskState.UNTOUCHED,
      state: ObjectState.ACTIVE,
      start: null,
      end: null
    };

    this._store.dispatch({type: Tasks.CREATE_AND_SELECT_TASK, payload: task});
  }

  private _getNextId(): number {

    if (this._tasks.length === 0) return 1;
    else return this._tasks[this._tasks.length - 1].id + 1;
  }
}
