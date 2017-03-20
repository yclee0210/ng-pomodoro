import {ActionReducer, Action} from '@ngrx/store';
import {Task} from '../_domains/task';
import {TaskState} from '../_enums/task-state.enum';
import {ObjectState} from '../_enums/object-state.enum';

const INIT = 'INIT';

export namespace TasksActions {
  export const CREATE_AND_SELECT_TASK = 'TasksActions.CREATE_AND_SELECT';
  export const CREATE_TASK = 'TasksActions.CREATE';
  export const UPDATE_TASK = 'TasksActions.UPDATE';
  export const DELETE_TASK = 'TasksActions.REMOVE';

  const initialState: Task[] = [];

  export const reducer: ActionReducer<Task[]> = (state = initialState, action: Action = {type: INIT}) => {

    switch (action.type) {
      case CREATE_AND_SELECT_TASK:
      case CREATE_TASK:

        state.unshift(createTask(action.payload, state));
        return state;

      case UPDATE_TASK:
        return state.map((task: Task) => {
          if (task.id === action.payload.id) return action.payload;
          else return task;
        });

      case DELETE_TASK:
        return state.filter((task: Task) => task.id !== action.payload.id);

      default:
        return state;
    }
  };

  const createTask = (name: string, tasks: Task[]) => {
    return {
      id: getNextId(tasks),
      name: name,
      pomodoros: [],
      taskState: TaskState.UNTOUCHED,
      state: ObjectState.ACTIVE,
      start: null,
      end: null
    }
  };

  const getNextId = (tasks: Task[]) => {

    if (tasks.length === 0) return 1;
    else return tasks[0].id + 1;
  }
}
