/* tslint:disable:no-unused-variable */
//TODO
import { TestBed, async, inject } from '@angular/core/testing';
import { PomodoroSettingsService } from './pomodoro-settings.service';

describe('PomodoroSettingsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PomodoroSettingsService]
    });
  });

  it('should ...', inject([PomodoroSettingsService], (service: PomodoroSettingsService) => {
    expect(service).toBeTruthy();
  }));
});
