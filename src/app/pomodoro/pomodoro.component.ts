import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Task} from './task';
import {TasksService} from './tasks.service';
import {TaskState} from './task-state.enum';
import * as moment from 'moment';
import {TimerObservable} from 'rxjs/observable/TimerObservable';

const DEFAULT_DURATION = 25 * 60 * 1000;

@Component({
  selector: 'app-pomodoro',
  templateUrl: './pomodoro.component.html',
  styleUrls: ['./pomodoro.component.scss']
})
export class PomodoroComponent implements OnInit, OnDestroy {
  taskForm: FormGroup;
  task: Task;
  remainingTime: any;
  timer: any;

  private subscription: any;
  private timerSubscription: any;

  constructor(private _task: TasksService, private _formBuilder: FormBuilder) {
    this.subscription = this._task.selectedTask$.subscribe(task => this.task = task);
  }

  ngOnInit() {
    this.taskForm = this._formBuilder.group({
      name: ['', Validators.required]
    });
    this.remainingTime = moment(DEFAULT_DURATION);
  }

  onSubmit({value, valid}: {value: Task, valid: boolean}) {
    if (valid) {

      this._task.create(value);
      this.ngOnInit();
    }
  }

  start() {
    switch (this.task.state) {
      case TaskState.UNTOUCHED:
        this._task.play(this.task);
        this.countDown();
        break;

      case TaskState.PAUSED:
        this._task.resume(this.task);
        this.countDown();
        break;

      default:
        break;
    }
  }

  pause() {
    switch (this.task.state) {
      case TaskState.PLAYING:
        this._task.pause(this.task);
        this.timerSubscription.unsubscribe();
        break;

      default:
        break;
    }
  }

  stop() {
    switch (this.task.state) {
      case TaskState.PLAYING:
        this.timerSubscription.unsubscribe();
        this._task.complete(this.task);
        break;

      case TaskState.PAUSED:
        this._task.complete(this.task);
        break;

      default:
        break;
    }
  }

  ngOnDestroy() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  countDown() {
    this.timer = TimerObservable.create(0, 1000);
    this.timerSubscription = this.timer.subscribe(() => {
      if (this.remainingTime > 0) {
        this.remainingTime.subtract(1, 'seconds');
      }
    });
  }
}
