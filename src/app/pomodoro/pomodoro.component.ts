import {Component, OnInit} from '@angular/core';
import {TasksService} from './tasks.service';
import {TaskSelectService} from './task-select.service';
import {Task} from '../_domains/task';

@Component({
  selector: 'app-pomodoro',
  templateUrl: './pomodoro.component.html',
  styleUrls: ['./pomodoro.component.scss']
})
export class PomodoroComponent implements OnInit {
  task: Task;
  tasks: Task[];

  private subscription: any;
  private tasksSubscription: any;

  constructor(private _task: TasksService, private _taskSelect: TaskSelectService) {
    this.subscription = this._taskSelect.selectedTask$.subscribe((task) => {
      this.task = task;
    });

    this.tasksSubscription = this._task.tasks$.subscribe((data) => {
      this.tasks = data;
    });
  }

  ngOnInit() {
  }
}
