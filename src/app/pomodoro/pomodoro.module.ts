import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PomodoroComponent} from './pomodoro.component';
import {SharedModule} from '../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import {TasksService} from './tasks.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  providers: [
    TasksService
  ],
  declarations: [PomodoroComponent],
  exports: [PomodoroComponent]
})
export class PomodoroModule {
}
