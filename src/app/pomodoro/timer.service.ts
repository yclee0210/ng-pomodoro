import {Injectable} from '@angular/core';
import {TimerObservable} from 'rxjs/observable/TimerObservable';
import {Observable} from 'rxjs/Observable';
import {TimerActions} from '../_reducers/timer.actions';
import {Store} from '@ngrx/store';
import {PomodoroState} from '../_enums/pomodoro-state.enum';
import {Pomodoro} from '../_domains/pomodoro';
import {Moment} from 'moment';

@Injectable()
export class TimerService {
  pomodoro: Pomodoro;
  pomodoro$: Observable<Pomodoro[]>;
  timer$: Observable<Moment>;

  private _clock$: Observable<number>;
  private clockSubscription: any;

  constructor(private _store: Store<any>) {
    this.timer$ = this._store.select<Moment>('timer');
    this.pomodoro$ = this._store.select<Pomodoro[]>('pomodoros');
    this._clock$ = TimerObservable.create(0, 1000);

    this.clockSubscription = this._clock$
      .switchMap(() => this.pomodoro$.map((list) => list[0]))
      .filter((pomodoro) => pomodoro && pomodoro.pomodoroState == PomodoroState.PLAYING)
      .subscribe(() => this._store.dispatch({type: TimerActions.TICK}));
  }

  setTime(time: number | string) {

    this._store.dispatch({type: TimerActions.SET_TIME, payload: time});
  }
}
