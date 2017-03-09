import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ClarityModule} from 'clarity-angular';
import {PomodoroModule} from './pomodoro/pomodoro.module';
import {StoreModule} from '@ngrx/store';
import {selectedTask} from './selected-task.reducer';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ClarityModule.forRoot(),
    PomodoroModule,
    StoreModule.provideStore({
      selectedTask: selectedTask
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
