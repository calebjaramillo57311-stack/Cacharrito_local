import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservaConfirmacion } from './reserva-confirmacion';

describe('ReservaConfirmacion', () => {
  let component: ReservaConfirmacion;
  let fixture: ComponentFixture<ReservaConfirmacion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservaConfirmacion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservaConfirmacion);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
