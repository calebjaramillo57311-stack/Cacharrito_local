import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionAutomoviles } from './gestion-automoviles';

describe('GestionAutomoviles', () => {
  let component: GestionAutomoviles;
  let fixture: ComponentFixture<GestionAutomoviles>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionAutomoviles],
    }).compileComponents();

    fixture = TestBed.createComponent(GestionAutomoviles);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
