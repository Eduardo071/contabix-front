import { TestBed } from '@angular/core/testing';

import { EnvironmentService } from './environment.service';
import { environment } from '../../../environments/environment.development';

describe('EnvironmentService', () => {
  let service: EnvironmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnvironmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return api url correctly', () => {
    const url = environment.API_URL;
    const returnUrl = service.getApiUrl();

    expect(returnUrl).toEqual(url);
  });
});
