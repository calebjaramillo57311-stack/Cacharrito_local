import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasajerosPorAutomovil } from './pasajeros-por-automovil';

describe('PasajerosPorAutomovil', () => {
  let component: PasajerosPorAutomovil;
  let fixture: ComponentFixture<PasajerosPorAutomovil>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasajerosPorAutomovil],
    }).compileComponents();

    fixture = TestBed.createComponent(PasajerosPorAutomovil);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
