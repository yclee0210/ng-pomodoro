/* tslint:disable:no-unused-variable */

import {TestBed, async, inject} from '@angular/core/testing';
import {TaskSelectService} from './task-select.service';
import {Store} from '@ngrx/store';
import {Task} from '../_domains/task';
import {TaskState} from '../_enums/task-state.enum';
import {ObjectState} from '../_enums/object-state.enum';
import {TaskSelectActions} from '../_reducers/task-select.actions';

class MockStore {
  public dispatch(obj) {
  }

  public select(key) {

    return key;
  }
}

describe('TaskSelectService', () => {
  let testFactory: TasksTestFactory;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TaskSelectService,
        {provide: Store, useClass: MockStore}
      ]
    });
    testFactory = new TasksTestFactory();
  });

  afterEach(() => {
    testFactory = undefined;
  });

  it('should be defined', inject([TaskSelectService, Store], (service: TaskSelectService, store: Store<any>) => {
    expect(service).toBeTruthy();
    expect(service.selectedTask$).toEqual('selectedTask');
  }));

  describe('method: select', () => {
    it('should dispatch SELECT with input', inject(
      [TaskSelectService, Store],
      (service: TaskSelectService, store: Store<any>) => {
        spyOn(store, 'dispatch');
        const task = testFactory.getTestTask(1);

        service.select(task);

        expect(store.dispatch).toHaveBeenCalledWith({
          type: TaskSelectActions.SELECT,
          payload: task
        });
      }
    ));
  });

  describe('method: deselect', () => {
    it('should dispatch SELECT with input', inject(
      [TaskSelectService, Store],
      (service: TaskSelectService, store: Store<any>) => {
        spyOn(store, 'dispatch');

        service.deselect();

        expect(store.dispatch).toHaveBeenCalledWith({
          type: TaskSelectActions.DESELECT
        });
      }
    ));
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
