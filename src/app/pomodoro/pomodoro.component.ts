import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {TasksService} from './tasks.service';
import {TaskState} from '../_enums/task-state.enum';
import * as moment from 'moment';
import {TimerObservable} from 'rxjs/observable/TimerObservable';
import {TaskSelectService} from './task-select.service';
import {PomodoroService} from './pomodoro.service';
import {Task} from '../_domains/task';
import {PomodoroStage} from '../_enums/pomodoro-stage.enum';

const DEFAULT_TASK_DURATION = 25 * 60 * 1000;
const LONG_BREAK_DURATION = 15 * 60 * 1000;
const SHORT_BREAK_DURATION = 5 * 60 * 1000;

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
  onBreak: boolean;
  tasks: Task[];

  private subscription: any;
  private tasksSubscription: any;
  private timerSubscription: any;

  constructor(private _task: TasksService,
              private _taskSelect: TaskSelectService,
              private _pomodoro: PomodoroService,
              private _formBuilder: FormBuilder) {
    this.subscription = this._taskSelect.selectedTask$.subscribe(task => this.task = task);

    this.tasksSubscription = this._task.tasks$.subscribe((data) => {
      console.log(data);
      this.tasks = data
    });
  }

  ngOnInit() {
    this.taskForm = this._formBuilder.group({
      name: ['', Validators.required]
    });
    this.remainingTime = moment(DEFAULT_TASK_DURATION);
  }

  onSubmit({value, valid}: {value: any, valid: boolean}) {
    if (valid) {

      this._task.createAndSelect(value.name);
      this.taskForm.reset();
    }
  }

  start() {
    switch (this.task.taskState) {
      case TaskState.UNTOUCHED:
        this._pomodoro.play(this.task.id);
        this.countDown();
        break;

      case TaskState.PAUSED:
        this._pomodoro.resume();
        this.countDown();
        break;

      default:
        break;
    }
  }

  pause() {
    this.timerSubscription.unsubscribe();
    this._pomodoro.pause();
  }

  stop() {
    this.timerSubscription.unsubscribe();

    switch (!this.onBreak && this._pomodoro.next()) {
      case PomodoroStage.LONG_BREAK:
        this.onBreak = true;
        this.remainingTime = moment(LONG_BREAK_DURATION);
        this.countDown();
        break;

      case PomodoroStage.SHORT_BREAK:
        this.onBreak = true;
        this.remainingTime = moment(SHORT_BREAK_DURATION);
        this.countDown();
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
      } else if (this.onBreak) {
        this.onBreak = false;
        this.timerSubscription.unsubscribe();
      } else {
        this.stop();
      }
    });
  }
}
