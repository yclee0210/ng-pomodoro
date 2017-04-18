/* tslint:disable:no-unused-variable */

import {TestBed, async, inject} from '@angular/core/testing';
import {PomodoroService} from './pomodoro.service';
import {Store} from '@ngrx/store';
import {PomodorosActions} from '../_reducers/pomodoros.actions';
import {PomodoroStage} from '../_enums/pomodoro-stage.enum';

class MockStore {
  public dispatch(obj) {
  }
}

describe('PomodoroService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        PomodoroService,
        {provide: Store, useClass: MockStore}
      ]
    });
  });

  it('should be defined', inject([PomodoroService], (service: PomodoroService) => {
    expect(service).toBeTruthy();
  }));

  describe('method: play', () => {
    it('should call dispatch with Play and input as payload', inject(
      [PomodoroService, Store],
      (service: PomodoroService, store: Store<any>) => {
        // given
        spyOn(store, 'dispatch');
        const taskId = 1;

        // when
        service.play(taskId);

        // then
        expect(store.dispatch).toHaveBeenCalledWith({
          type: PomodorosActions.PLAY,
          payload: taskId
        });
      })
    );
  });

  describe('method: pause', () => {
    it('should dispatch pause', inject(
      [PomodoroService, Store],
      (service: PomodoroService, store: Store<any>) => {
        spyOn(store, 'dispatch');

        service.pause();

        expect(store.dispatch).toHaveBeenCalledWith({
          type: PomodorosActions.PAUSE
        });
      })
    );
  });

  describe('method: resume', () => {
    it('should dispatch resume', inject(
      [PomodoroService, Store],
      (service: PomodoroService, store: Store<any>) => {
        spyOn(store, 'dispatch');

        service.resume();

        expect(store.dispatch).toHaveBeenCalledWith({
          type: PomodorosActions.RESUME
        });
      })
    );
  });

  describe('method: stop', () => {
    it('should dispatch stop', inject(
      [PomodoroService, Store],
      (service: PomodoroService, store: Store<any>) => {
        spyOn(store, 'dispatch');

        service.stop();

        expect(store.dispatch).toHaveBeenCalledWith({
          type: PomodorosActions.STOP
        });
      })
    );
  });

  describe('method: next', () => {
    it('should dispatch STOP and return SHORT_BREAK on 1,2,3th next and LONG_BREAK on 4th', inject(
      [PomodoroService, Store],
      (service: PomodoroService, store: Store<any>) => {
        spyOn(store, 'dispatch');

        let first = service.next();
        let second = service.next();
        let third = service.next();
        let fourth = service.next();
        let fifth = service.next();

        expect(store.dispatch).toHaveBeenCalledWith({
          type: PomodorosActions.STOP
        });
        expect(store.dispatch).toHaveBeenCalledTimes(5);
        expect(first).toEqual(PomodoroStage.SHORT_BREAK);
        expect(second).toEqual(PomodoroStage.SHORT_BREAK);
        expect(third).toEqual(PomodoroStage.SHORT_BREAK);
        expect(fourth).toEqual(PomodoroStage.LONG_BREAK);
        expect(fifth).toEqual(PomodoroStage.SHORT_BREAK);
      })
    );
  });
});
