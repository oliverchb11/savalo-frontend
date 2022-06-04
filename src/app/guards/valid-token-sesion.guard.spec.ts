import { TestBed } from '@angular/core/testing';

import { ValidTokenSesionGuard } from './valid-token-sesion.guard';

describe('ValidTokenSesionGuard', () => {
  let guard: ValidTokenSesionGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ValidTokenSesionGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
