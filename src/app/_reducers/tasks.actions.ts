import {ActionReducer, Action} from '@ngrx/store';
import {Task} from '../_domains/task';
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

        state.unshift(action.payload);
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
}
