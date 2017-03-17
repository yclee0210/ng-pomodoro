import {TaskState} from '../_enums/task-state.enum';
import {ObjectState} from '../_enums/object-state.enum';
import {Task} from '../_domains/task';
import {TasksActions} from './tasks.actions';

describe('TasksActions', () => {
  let testFactory: TasksTestFactory;
  beforeEach(() => {
    testFactory = new TasksTestFactory();
  });

  afterEach(() => {
    testFactory = undefined;
  });

  describe('Action: CREATE_AND_SELECT', () => {
    it('should add payload to front of current task list', () => {
      const given = testFactory.getTestTasks();

      const payload = testFactory.getTestTask(3);
      const when = {type: TasksActions.CREATE_AND_SELECT_TASK, payload: payload};

      const then = TasksActions.reducer(given, when);
      expect(then.length).toEqual(3);
      expect(then[0].id).toEqual(3);
    });
  });

  describe('Action: CREATE', () => {
    it('should add payload to front of current task list', () => {
      const given = testFactory.getTestTasks();

      const payload = testFactory.getTestTask(3);
      const when = {type: TasksActions.CREATE_AND_SELECT_TASK, payload: payload};

      const then = TasksActions.reducer(given, when);
      expect(then.length).toEqual(3);
      expect(then[0].id).toEqual(3);
    });
  });

  describe('Action: UPDATE', () => {
    it('should replace the task with matching id with the payload', () => {
      const given = testFactory.getTestTasks();

      let payload = testFactory.getTestTask(2);
      payload.name = 'New Task';
      const when = {type: TasksActions.UPDATE_TASK, payload: payload};

      const then = TasksActions.reducer(given, when);
      expect(then.length).toEqual(2);
      expect(then[1].name).toEqual('New Task');
    });
  });

  describe('Action: DELETE', () => {
    it('should remove the task with said id', () => {
      const given = testFactory.getTestTasks();

      const when = {type: TasksActions.DELETE_TASK, payload: {id: 2}};

      const then = TasksActions.reducer(given, when);
      expect(then.length).toEqual(1);
      expect(then[0].id).toEqual(1);
    });
  });
});

class TasksTestFactory {
  getTestTask(id: number): Task {

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

  getTestTasks(): Task[] {

    return [
      this.getTestTask(1),
      this.getTestTask(2)
    ]
  }
}
