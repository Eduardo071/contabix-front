import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListArquivosComponent } from './list-arquivos.component';

describe('ListArquivosComponent', () => {
  let component: ListArquivosComponent;
  let fixture: ComponentFixture<ListArquivosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListArquivosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListArquivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
