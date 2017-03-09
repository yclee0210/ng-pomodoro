import {Task} from './pomodoro/task';
import {ActionReducer, Action} from '@ngrx/store';
import {TaskState} from './pomodoro/task-state.enum';
/**
 * Created by yclee on 09/03/2017.
 */

export const CREATE_TASK = 'CREATE_TASK';
export const START_TASK = 'START_TASK';
export const UPDATE_TASK = 'UPDATE_TASK';
export const COMPLETE_TASK = 'COMPLETE_TASK';

export const INIT = 'INIT';

const initialState: Task = {
  name: null,
  duration: {
    start: null,
    end: null
  },
  pauses: [],
  state: TaskState.UNTOUCHED
};

export const selectedTask: ActionReducer<Task> = (state = initialState, action: Action = {type: INIT}) => {

  switch (action.type) {
    case CREATE_TASK:
      return Object.assign({}, new Task(action.payload.name));


    case START_TASK:
      console.log(action.payload);
      return Object.assign({}, state, action.payload);

    case UPDATE_TASK:
      console.log(action.payload);
      return Object.assign({}, state, action.payload);

    case COMPLETE_TASK:
      console.log(action.payload);
      return Object.assign({}, initialState);
  }
};
