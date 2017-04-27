import { Injectable } from '@angular/core';

@Injectable()
export class PomodoroSettingsService {
  readonly DEFAULT_TASK_DURATION = 25 * 60 * 1000;
  readonly LONG_BREAK_DURATION = 15 * 60 * 1000;
  readonly SHORT_BREAK_DURATION = 5 * 60 * 1000;
  readonly LONG_BREAK_PERIOD = 4;

  constructor() { }

}
