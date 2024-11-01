/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthenticateUserService } from './authenticate-user.service';

describe('Service: AuthenticateUser', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthenticateUserService]
    });
  });

  it('should ...', inject([AuthenticateUserService], (service: AuthenticateUserService) => {
    expect(service).toBeTruthy();
  }));
});
