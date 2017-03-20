import {ActionReducer, Action} from '@ngrx/store';
import {Task} from '../_domains/task';

export namespace TaskSelectActions {
  const INIT = 'INIT';
  export const SELECT = 'SELECT';
  export const DESELECT = 'DESELECT';

  const initialState: Task = null;

  export const reducer: ActionReducer<Task> = (state = initialState, action: Action = {type: INIT}) => {
    switch (action.type) {
      case SELECT:
        return action.payload;

      case DESELECT:
        return initialState;

      default:
        return state;
    }
  }
}
