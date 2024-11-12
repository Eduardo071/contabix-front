import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSolicitationComponent } from './form-solicitation.component';

describe('FormSolicitationComponent', () => {
  let component: FormSolicitationComponent;
  let fixture: ComponentFixture<FormSolicitationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormSolicitationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormSolicitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
