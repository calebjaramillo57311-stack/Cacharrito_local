import { TestBed } from '@angular/core/testing';

import { ViajeServicio } from './viaje-servicio';

describe('Viaje', () => {
  let service: ViajeServicio;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViajeServicio);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
