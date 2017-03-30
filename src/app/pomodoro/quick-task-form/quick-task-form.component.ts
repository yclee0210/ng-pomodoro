import {Component, OnInit} from '@angular/core';
import {TasksService} from '../tasks.service';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-quick-task-form',
  templateUrl: './quick-task-form.component.html',
  styleUrls: ['./quick-task-form.component.scss']
})
export class QuickTaskFormComponent implements OnInit {
  task: FormGroup;

  constructor(private _task: TasksService, private _formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.task = this._formBuilder.group({
      name: ['', Validators.required]
    })
  }

  onSubmit({value, valid}: {value: any, valid: boolean}) {
    if (valid) {

      this._task.createAndSelect(value.name);
      this.task.reset();
    }
  }
}
