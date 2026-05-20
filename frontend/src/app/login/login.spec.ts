import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginEntidad } from './login';

describe('LoginEntidad', () => {
  let component: LoginEntidad;
  let fixture: ComponentFixture<LoginEntidad>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginEntidad],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginEntidad);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
