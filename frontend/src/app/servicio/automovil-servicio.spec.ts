import { TestBed } from '@angular/core/testing';

import { AutomovilServicio } from './automovil-servicio';

describe('Automovil', () => {
  let service: AutomovilServicio;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutomovilServicio);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
