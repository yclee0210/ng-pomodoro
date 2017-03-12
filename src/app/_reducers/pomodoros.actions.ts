import {ActionReducer, Action} from '@ngrx/store';
import {Task} from '../_domains/task';
import {Pomodoro} from '../_domains/pomodoro';
import {PomodoroState} from '../_enums/pomodoro-state.enum';
import * as moment from 'moment';
import {ObjectState} from '../_enums/object-state.enum';

export namespace PomodorosActions {
  const INIT = 'INIT';
  export const PLAY = 'PomodorosActions.PLAY';
  export const PAUSE = 'PomodorosActions.PAUSE';
  export const RESUME = 'PomodorosActions.RESUME';
  export const STOP = 'PomodorosActions.STOP';

  const initialState: Pomodoro[] = [];

  export const reducer: ActionReducer<Pomodoro[]> = (state = initialState, action: Action = {type: INIT}) => {
    let newState: Pomodoro[];
    switch (action.type) {
      case PLAY:
        newState = Object.assign([], state);
        newState.unshift(_createPomodoro(state, action, action.payload));

        return newState;

      case PAUSE:
        newState = Object.assign([], state);
        newState[0].pauses.unshift({
          start: moment().toISOString(),
          end: null
        });
        newState[0].pomodoroState = PomodoroState.PAUSED;

        return newState;

      case RESUME:
        newState = Object.assign([], state);
        newState[0].pauses[0].end = moment().toISOString();
        newState[0].pomodoroState = PomodoroState.PLAYING;

        return newState;

      case STOP:
        newState = Object.assign([], state);
        let currentTask = newState[0];
        if (currentTask.pomodoroState === PomodoroState.PAUSED) {

          currentTask.end = currentTask.pauses[0].start;
          currentTask.pauses.shift();
        } else {

          currentTask.end = moment().toISOString();
        }

        return newState;

      default:
        return state;
    }
  };

  const _createPomodoro = (state: Pomodoro[], action: Action, taskId: number) => Object.assign({
    id: _getPomodoroId(state),
    taskId: action.payload,
    pauses: [],
    pomodoroState: PomodoroState.PLAYING,
    start: moment().toISOString(),
    end: null,
    state: ObjectState.ACTIVE
  });

  const _getPomodoroId = (state: Pomodoro[]) => {
    if (state.length === 0) return 1;
    else return state[0].id + 1;
  };
}
