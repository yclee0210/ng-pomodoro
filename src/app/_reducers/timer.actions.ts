import {Moment} from 'moment';
import * as moment from 'moment';
import {Action, ActionReducer} from '@ngrx/store';

export namespace TimerActions {
  const INIT = 'INIT';
  const initialState: Moment = moment(0);

  export const SET_TIME = 'TimerActions.SET_TIME';
  export const TICK = 'TimerActions.TICK';

  export const reducer: ActionReducer<Moment> = (state = initialState, action: Action = {type: INIT}) => {
    switch (action.type) {
      case SET_TIME:
        let time = action.payload;

        if (typeof time == "number") return moment(time);
        else if (typeof time == "string") return moment(time, 'hh:mm:ss');
        else return state;

      case TICK:

        return moment(state.subtract(1, 'seconds'));

      default:
        return state;
    }
  }
}
