/* tslint:disable:no-unused-variable */

import {TestBed, async, inject} from '@angular/core/testing';
import {TasksService} from './tasks.service';
import {StoreModule, Store} from '@ngrx/store';
import {TasksActions} from '../_reducers/tasks.actions';

class MockStore {
  public dispatch(obj) {
  }

  public select(key) {

    return key;
  }
}

describe('TasksService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TasksService,
        {provide: Store, useClass: MockStore}
      ]
    });
  });

  it('should define', inject([TasksService, Store], (service: TasksService) => {
    expect(service).toBeTruthy();
    expect(service.tasks$).toBeDefined();
  }));

  describe('method: createAndSelect', () => {
    it('should dispatch create and select with input name string', inject(
      [TasksService, Store],
      (service: TasksService, store: Store<any>) => {
        const name = 'New task';
        spyOn(store, 'dispatch');

        service.createAndSelect(name);

        expect(store.dispatch).toHaveBeenCalledWith({
          type: TasksActions.CREATE_AND_SELECT_TASK,
          payload: name
        });
      }
    ));
  });
});
