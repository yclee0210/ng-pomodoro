import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {PomodorosActions} from '../_reducers/pomodoros.actions';
import {PomodoroSettingsService} from './pomodoro-settings.service';
import {TimerService} from './timer.service';

@Injectable()
export class PomodoroService {
  private _pomodoroCount: number;

  constructor(private _store: Store<any>, private _settings: PomodoroSettingsService, private _timer: TimerService) {
    this._pomodoroCount = 0;
    this._timer.setTime(_settings.DEFAULT_TASK_DURATION);
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
}
