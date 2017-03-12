/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TaskSelectService } from './task-select.service';

describe('TaskSelectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TaskSelectService]
    });
  });

  it('should ...', inject([TaskSelectService], (service: TaskSelectService) => {
    expect(service).toBeTruthy();
  }));
});
