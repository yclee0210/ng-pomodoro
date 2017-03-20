import {TaskSelectActions} from './task-select.actions';
import {TaskState} from '../_enums/task-state.enum';
import {ObjectState} from '../_enums/object-state.enum';

describe('TaskSelectActions', () => {
  let testFactory: TaskTestFactory;

  beforeEach(() => {
    testFactory = new TaskTestFactory();
  });

  afterEach(() => {
    testFactory = undefined;
  });

  describe('Action: SELECT', () => {
    it('should return payload', () => {
      const given = null;

      const payload = testFactory.getTestTask(1);
      const when = {type: TaskSelectActions.SELECT, payload: payload};

      const then = TaskSelectActions.reducer(given, when);
      expect(then).toEqual(payload);
    });
  });

  describe('Action: DESELECT', () => {
    it('should return null', () => {
      const given = testFactory.getTestTask(1);

      const when = {type: TaskSelectActions.DESELECT};

      const then = TaskSelectActions.reducer(given, when);
      expect(then).toBeNull();
    });
  });
});

class TaskTestFactory {
  getTestTask(id: number) {

    return {
      id: id,
      name: 'Test Task',
      pomodoros: [],
      taskState: TaskState.UNTOUCHED,
      start: null,
      end: null,
      state: ObjectState.ACTIVE
    };
  }
}
