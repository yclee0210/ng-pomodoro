import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {PomodorosActions} from '../_reducers/pomodoros.actions';
import {PomodoroStage} from '../_enums/pomodoro-stage.enum';

@Injectable()
export class PomodoroService {
  private _pomodoroCount: number;

  constructor(private _store: Store<any>) {
    this._pomodoroCount = 0;
  }

  play(taskId: number) {

    this._store.dispatch({type: PomodorosActions.PLAY, payload: taskId});
  }

  pause() {

    this._store.dispatch({type: PomodorosActions.PAUSE});
  }

  resume() {

    this._store.dispatch({type: PomodorosActions.RESUME});
  }

  stop() {

    this._store.dispatch({type: PomodorosActions.STOP});
  }

  next() {
    this._pomodoroCount = (this._pomodoroCount + 1) % 4;
    this._store.dispatch({type: PomodorosActions.STOP});
    if (this._pomodoroCount === 0) {
      return PomodoroStage.LONG_BREAK;
    } else {
      return PomodoroStage.SHORT_BREAK;
    }
  }
}
