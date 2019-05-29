import { TestBed } from '@angular/core/testing';

import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { AdminGuard } from './admin.guard';

class MockAuthService {
  private _status: Observable<boolean>;

  set status(upd: Observable<boolean>) {
    this._status = upd;
  }

  public isAdmin() {
    return this._status;
  }
}

describe('AdminGuard', () => {
  let guard: AdminGuard;
  let router: Router;
  let authService: MockAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminGuard, { provide: AuthService, useClass: MockAuthService }],
      imports: [RouterTestingModule],
    });

    guard = TestBed.get(AdminGuard);
    router = TestBed.get(Router);
    authService = TestBed.get(AuthService);
    spyOn(router, 'navigateByUrl').and.returnValue(true);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return false if the user is not admin and redirect to courses', () => {
    authService.status = of(false);
    guard.canActivate(null, null).subscribe(res => expect(res).toBeFalsy());
    expect(router.navigateByUrl).toHaveBeenCalledWith('courses');
  });

  it('should return true if the user is admin', () => {
    authService.status = of(true);
    guard.canActivate(null, null).subscribe(res => expect(res).toBeTruthy());
  });
});
