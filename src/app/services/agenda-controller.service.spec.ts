import { TestBed } from '@angular/core/testing';

import { AgendaControllerService } from './agenda-controller.service';

describe('AgendaControllerService', () => {
  let service: AgendaControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgendaControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
