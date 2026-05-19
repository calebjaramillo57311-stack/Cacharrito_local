import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViajesDisponibles } from './viajes-disponibles';

describe('ViajesDisponibles', () => {
  let component: ViajesDisponibles;
  let fixture: ComponentFixture<ViajesDisponibles>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViajesDisponibles],
    }).compileComponents();

    fixture = TestBed.createComponent(ViajesDisponibles);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
