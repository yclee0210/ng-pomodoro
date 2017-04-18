/* tslint:disable:no-unused-variable */
import {PomodoroControlsComponent} from './pomodoro-controls.component';
import {Subject} from 'rxjs';

describe('PomodoroControlsComponent', () => {
  let pomodoroService: any;
  let taskSelectService: any;

  beforeEach(() => {
    pomodoroService = {
      play: jasmine.createSpy('play'),
      pause: jasmine.createSpy('pause'),
      resume: jasmine.createSpy('resume'),
      stop: jasmine.createSpy('stop')
    };
    taskSelectService = {
      selectedTask$: new Subject(),
      select: jasmine.createSpy('select'),
      deselect: jasmine.createSpy('deselect')
    };
  });

  afterEach(() => {
    pomodoroService = undefined;
    taskSelectService = undefined;
  });

  describe('method: play', () => {
    it('should call play on pomodoroService with given id', () => {
      const component = new PomodoroControlsComponent(pomodoroService, taskSelectService);
      taskSelectService.selectedTask$.next({id: 1});

      component.play();

      expect(pomodoroService.play).toHaveBeenCalledWith(1);
    });

    it('should call play on pomodoroService with null value if task is undefined', () => {
      const component = new PomodoroControlsComponent(pomodoroService, taskSelectService);
      taskSelectService.selectedTask$.next(null);

      component.play();

      expect(pomodoroService.play).toHaveBeenCalledWith(null);
    });
  });

  describe('method: pause', () => {
    it('should call pause on pomodoroService', () => {
      const component = new PomodoroControlsComponent(pomodoroService, taskSelectService);

      component.pause();

      expect(pomodoroService.pause).toHaveBeenCalled();
    });
  });

  describe('method: resume', () => {
    it('should call resume on pomodoroService', () => {
      const component = new PomodoroControlsComponent(pomodoroService, taskSelectService);

      component.resume();

      expect(pomodoroService.resume).toHaveBeenCalled();
    });
  });

  describe('method: stop', () => {
    it('should call stop on pomodoroService', () => {
      const component = new PomodoroControlsComponent(pomodoroService, taskSelectService);

      component.stop();

      expect(pomodoroService.stop).toHaveBeenCalled();
    });
  });
});
