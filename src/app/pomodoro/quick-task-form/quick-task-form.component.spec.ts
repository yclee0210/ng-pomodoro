/* tslint:disable:no-unused-variable */
import { QuickTaskFormComponent } from './quick-task-form.component';
import {FormBuilder} from '@angular/forms';

describe('QuickTaskFormComponent', () => {
  let tasksService: any;
  let formBuilder: FormBuilder;

  beforeEach(() => {
    tasksService = {
      createAndSelect: jasmine.createSpy('createAndSelect')
    };
    formBuilder = new FormBuilder();
  });

  afterEach(() => {
    tasksService = undefined;
    formBuilder = undefined;
  });

  describe('method: onInit', () => {
    it('should build the form', () => {
      const component = new QuickTaskFormComponent(tasksService, formBuilder);

      component.ngOnInit();

      expect(component.task.constructor.name).toEqual('FormGroup');
    });
  });

  describe('method: onSubmit', () => {
    it('should call createAndSelect on taskService and reset the form', () => {
      const component = new QuickTaskFormComponent(tasksService, formBuilder);
      const name = 'new name';
      component.ngOnInit();
      spyOn(component.task, 'reset');

      component.task.setValue({
        name: name
      });
      component.onSubmit(component.task);

      expect(component.task.reset).toHaveBeenCalled();
      expect(tasksService.createAndSelect).toHaveBeenCalledWith(name);
    });

    it('should not call anything if name field is empty', () => {
      const component = new QuickTaskFormComponent(tasksService, formBuilder);
      const name = '';
      component.ngOnInit();
      spyOn(component.task, 'reset');

      component.task.setValue({
        name: name
      });
      component.onSubmit(component.task);

      expect(component.task.reset).not.toHaveBeenCalled();
      expect(tasksService.createAndSelect).not.toHaveBeenCalled();
    });
  });

});
