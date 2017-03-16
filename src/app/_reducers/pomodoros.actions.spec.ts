import {PomodoroState} from '../_enums/pomodoro-state.enum';
import {ObjectState} from '../_enums/object-state.enum';
import {Action} from '@ngrx/store';
import {PomodorosActions} from './pomodoros.actions';
import {Pomodoro} from '../_domains/pomodoro';

describe('PomodorosActions Test', () => {
  let testFactory: PomodorosTestFactory;

  beforeEach(() => {
    testFactory = new PomodorosTestFactory();
  });

  afterEach(() => {
    testFactory = undefined;
  });

  describe('Action: PLAY', () => {
    it('should return new Pomodoro list with a new task with input as taskId in first element', () => {
      const given = testFactory.getEmptyList();
      const input = 2;

      const when: Action = {type: PomodorosActions.PLAY, payload: input};

      const then: Pomodoro[] = PomodorosActions.reducer(given, when);
      expect(then.length).toEqual(1);
      expect(then[0].id).toEqual(1);
      expect(then[0].taskId).toEqual(input);
      expect(then[0].pauses.length).toEqual(0);
      expect(then[0].pomodoroState).toEqual(PomodoroState.PLAYING);
      expect(typeof then[0].start).toEqual('string');
      expect(then[0].end).toBeNull();
      expect(then[0].state).toEqual(ObjectState.ACTIVE);
    });

    it('should assign next available id if list is not empty', () => {
      const given = testFactory.getList();
      const input = 2;

      const when: Action = {type: PomodorosActions.PLAY, payload: input};

      const then: Pomodoro[] = PomodorosActions.reducer(given, when);
      expect(then.length).toEqual(3);
      expect(then[0].id).toEqual(3);
      expect(then[0].taskId).toEqual(input);
      expect(then[0].pauses.length).toEqual(0);
      expect(then[0].pomodoroState).toEqual(PomodoroState.PLAYING);
      expect(typeof then[0].start).toEqual('string');
      expect(then[0].end).toBeNull();
      expect(then[0].state).toEqual(ObjectState.ACTIVE);
    });
  });

  describe('Action: PAUSE', () => {
    it('should update the latest pomodoro with a new pause starting point', () => {
      const given = testFactory.getList();

      const when: Action = {type: PomodorosActions.PAUSE};

      const then: Pomodoro[] = PomodorosActions.reducer(given, when);
      expect(then.length).toEqual(2);
      expect(then[0].pauses.length).toEqual(1);
      expect(then[0].pomodoroState).toEqual(PomodoroState.PAUSED);
      expect(typeof then[0].pauses[0].start).toEqual('string');
    });
  });

  describe('Action: RESUME', () => {
    it('should change pState to PLAYING and add end time to the first pause', () => {
      const given = PomodorosActions.reducer(testFactory.getList(), {type: PomodorosActions.PAUSE});

      const when: Action = {type: PomodorosActions.RESUME};

      const then: Pomodoro[] = PomodorosActions.reducer(given, when);
      expect(then.length).toEqual(2);
      expect(then[0].pauses.length).toEqual(1);
      expect(then[0].pomodoroState).toEqual(PomodoroState.PLAYING);
      expect(typeof then[0].pauses[0].start).toEqual('string');
      expect(typeof then[0].pauses[0].end).toEqual('string');
    });
  });

  describe('Action: STOP', () => {
    it('should change pState to COMPLETED from PAUSED with previous pause start time as end', () => {
      const given = PomodorosActions.reducer(testFactory.getList(), {type: PomodorosActions.PAUSE});
      const pauseStart = given[0].pauses[0].start;

      const when: Action = {type: PomodorosActions.STOP};

      const then: Pomodoro[] = PomodorosActions.reducer(given, when);
      expect(then.length).toEqual(2);
      expect(then[0].pauses.length).toEqual(0);
      expect(then[0].pomodoroState).toEqual(PomodoroState.COMPLETED);
      expect(then[0].end).toEqual(pauseStart);
    });

    it('should change pState to COMPLETED from PLAYING and set end time', () => {
      const given = PomodorosActions.reducer(testFactory.getList(), {type: PomodorosActions.PLAY});

      const when: Action = {type: PomodorosActions.STOP};

      const then: Pomodoro[] = PomodorosActions.reducer(given, when);
      expect(then.length).toEqual(3);
      expect(then[0].pauses.length).toEqual(0);
      expect(then[0].pomodoroState).toEqual(PomodoroState.COMPLETED);
      expect(typeof then[0].end).toEqual('string');
    });
  });
});

class PomodorosTestFactory {
  getList() {
    let task1 = this.getTask(1, 1);
    let task2 = this.getTask(2, 1);

    return [
      task2,
      task1
    ];
  }

  getEmptyList() {

    return [
    ];
  }

  getTask(id: number, taskId: number, state: PomodoroState = PomodoroState.COMPLETED) {
    return {
      id: id,
      taskId: taskId,
      pauses: [],
      pomodoroState: state,
      start: null,
      end: null,
      state: ObjectState.ACTIVE
    };
  }
}
