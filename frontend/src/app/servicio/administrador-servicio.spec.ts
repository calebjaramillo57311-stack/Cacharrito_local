import { TestBed } from '@angular/core/testing';

import { AdministradorServicio } from './administrador-servicio';

describe('AdministradorServicio', () => {
  let service: AdministradorServicio;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdministradorServicio);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
