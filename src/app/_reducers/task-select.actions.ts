import {ActionReducer, Action} from '@ngrx/store';

export namespace TaskSelectActions {
  const INIT = 'INIT';
  export const SELECT = 'SELECT';
  export const DESELECT = 'DESELECT';

  const initialState: number = null;

  export const reducer: ActionReducer<number> = (state = initialState, action: Action = {type: INIT}) => {
    switch (action.type) {
      case SELECT:
        console.log('select task');
        console.log(action.payload);
        return action.payload;

      case DESELECT:
        return initialState;

      default:
        return state;
    }
  }
}
