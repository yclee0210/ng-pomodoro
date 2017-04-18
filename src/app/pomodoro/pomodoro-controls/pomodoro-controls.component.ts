import { Component, OnInit } from '@angular/core';
import {PomodoroService} from '../pomodoro.service';
import {TaskSelectService} from '../task-select.service';
import {Task} from '../../_domains/task';
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'app-pomodoro-controls',
  templateUrl: './pomodoro-controls.component.html',
  styleUrls: ['./pomodoro-controls.component.scss']
})
export class PomodoroControlsComponent implements OnInit {
  private _task: Task;
  private subscription: any;

  constructor(private _pomodoro: PomodoroService, private _selectedTask: TaskSelectService) {
    this.subscription = this._selectedTask.selectedTask$.subscribe(task => this._task = task);
  }

  ngOnInit() {
  }

  play() {
    if (isNullOrUndefined(this._task)) {

      this._pomodoro.play(null);
    } else {

      this._pomodoro.play(this._task.id);
    }
  }

  pause() {

    this._pomodoro.pause();
  }

  resume() {

    this._pomodoro.resume();
  }

  stop() {

    this._pomodoro.stop();
  }
}
