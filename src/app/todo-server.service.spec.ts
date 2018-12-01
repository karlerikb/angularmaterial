import { TestBed } from '@angular/core/testing';

import { TodoServerService } from './todo-server.service';

describe('TodoServerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TodoServerService = TestBed.get(TodoServerService);
    expect(service).toBeTruthy();
  });
});
