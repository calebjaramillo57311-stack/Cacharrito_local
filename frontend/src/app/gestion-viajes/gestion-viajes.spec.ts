import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionViajes } from './gestion-viajes';

describe('GestionViajes', () => {
  let component: GestionViajes;
  let fixture: ComponentFixture<GestionViajes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionViajes],
    }).compileComponents();

    fixture = TestBed.createComponent(GestionViajes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
