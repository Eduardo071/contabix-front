import { TestBed } from '@angular/core/testing';

import { ListaContadoresEmpresasService } from './lista-contadores-empresas.service';

describe('ListaContadoresEmpresasService', () => {
  let service: ListaContadoresEmpresasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListaContadoresEmpresasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
