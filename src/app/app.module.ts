import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ClarityModule} from 'clarity-angular';
import {PomodoroModule} from './pomodoro/pomodoro.module';
import {StoreModule} from '@ngrx/store';
import {TaskSelectActions} from './_reducers/task-select.actions';
import {TasksActions} from './_reducers/tasks.actions';
import {PomodorosActions} from './_reducers/pomodoros.actions';
import {TimerActions} from './_reducers/timer.actions';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ClarityModule.forRoot(),
    PomodoroModule,
    StoreModule.provideStore({
      tasks: TasksActions.reducer,
      selectedTask: TaskSelectActions.reducer,
      pomodoros: PomodorosActions.reducer,
      timer: TimerActions.reducer
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
