import {ActionReducer, Action} from '@ngrx/store';
import {Task} from '../_domains/task';
const INIT = 'INIT';

export namespace Tasks {
  export const CREATE_AND_SELECT_TASK = 'CREATE_AND_SELECT_TASK';
  export const CREATE_TASK = 'CREATE_TASK';
  export const DELETE_TASK = 'REMOVE_TASK';
  export const UPDATE_TASK = 'UPDATE_TASK';

  const initialState: Task[] = [];

  export const reducer: ActionReducer<Task[]> = (state = initialState, action: Action = {type: INIT}) => {

    switch (action.type) {
      case CREATE_AND_SELECT_TASK:
      case CREATE_TASK:
        return Object.assign([], state.concat([action.payload]));

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
