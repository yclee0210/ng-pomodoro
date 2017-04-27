import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PomodoroComponent} from './pomodoro.component';
import {SharedModule} from '../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import {TasksService} from './tasks.service';
import {TasksEffects} from './tasks.effect';
import {EffectsModule} from '@ngrx/effects';
import {TaskSelectService} from './task-select.service';
import {PomodoroService} from './pomodoro.service';
import {QuickTaskFormComponent} from './quick-task-form/quick-task-form.component';
import {PomodoroControlsComponent} from './pomodoro-controls/pomodoro-controls.component';
import {PomodoroTimerComponent} from './pomodoro-timer/pomodoro-timer.component';
import {PomodoroSettingsService} from './pomodoro-settings.service';
import {TimerService} from './timer.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    EffectsModule.run(TasksEffects),
  ],
  providers: [
    TasksService,
    TaskSelectService,
    PomodoroService,
    PomodoroSettingsService,
    TimerService
  ],
  declarations: [
    PomodoroComponent,
    QuickTaskFormComponent,
    PomodoroControlsComponent,
    PomodoroTimerComponent
  ],
  exports: [PomodoroComponent]
})
export class PomodoroModule {
}
