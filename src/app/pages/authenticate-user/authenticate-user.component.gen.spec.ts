import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AuthenticateUserComponent } from './authenticate-user.component';

describe('AuthenticateUserComponent', () => {
  let component: AuthenticateUserComponent;
  let fixture: ComponentFixture<AuthenticateUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [AuthenticateUserComponent]
    });
    fixture = TestBed.createComponent(AuthenticateUserComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
});
