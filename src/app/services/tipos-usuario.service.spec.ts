import { TestBed } from '@angular/core/testing';

import { TiposUsuarioService } from './tipos-usuario.service';

describe('TiposUsuarioService', () => {
  let service: TiposUsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TiposUsuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
