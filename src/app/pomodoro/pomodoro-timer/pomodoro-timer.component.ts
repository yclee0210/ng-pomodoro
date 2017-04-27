import {Component, OnInit} from '@angular/core';
import {TimerService} from '../timer.service';

@Component({
  selector: 'app-pomodoro-timer',
  templateUrl: './pomodoro-timer.component.html',
  styleUrls: ['./pomodoro-timer.component.scss']
})
export class PomodoroTimerComponent implements OnInit {
  time: string;

  private _timerSubscription: any;

  constructor(private _timer: TimerService) {
    this._timerSubscription = this._timer.timer$
      .filter((value) => value.constructor.name == "Moment")
      .map((value) => value.format('mm:ss'))
      .subscribe((value) => {
        this.time = value;
      });
  }

  ngOnInit() {
  }
}
