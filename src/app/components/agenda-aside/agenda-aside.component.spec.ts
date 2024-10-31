import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendaAsideComponent } from './agenda-aside.component';

describe('AgendaAsideComponent', () => {
  let component: AgendaAsideComponent;
  let fixture: ComponentFixture<AgendaAsideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgendaAsideComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgendaAsideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
