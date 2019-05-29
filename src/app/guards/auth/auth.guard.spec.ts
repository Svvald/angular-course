
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { AuthGuard } from './auth.guard';

class MockAuthService {
  private _status: boolean;

  set status(upd: boolean) {
    this._status = upd;
  }

  public isAuthenticated() {
    return this._status;
  }
}

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let router: Router;
  let authService: MockAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuard, { provide: AuthService, useClass: MockAuthService }],
      imports: [RouterTestingModule.withRoutes([])],
    });

    guard = TestBed.get(AuthGuard);
    router = TestBed.get(Router);
    authService = TestBed.get(AuthService);
    spyOn(router, 'navigateByUrl').and.returnValue(true);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return false if the user is not logged in and redirect to login', () => {
    authService.status = false;
    guard.canActivate(null, null).subscribe(res => expect(res).toBeFalsy());
    expect(router.navigateByUrl).toHaveBeenCalledWith('login');
  });

  it('should return true if the user is logged in', () => {
    authService.status = true;
    guard.canActivate(null, null).subscribe(res => expect(res).toBeTruthy());
  });
});
