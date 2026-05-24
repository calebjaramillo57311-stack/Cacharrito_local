import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservasDelDia } from './reservas-del-dia';

describe('ReservasDelDia', () => {
  let component: ReservasDelDia;
  let fixture: ComponentFixture<ReservasDelDia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservasDelDia],
    }).compileComponents();

    fixture = TestBed.createComponent(ReservasDelDia);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
