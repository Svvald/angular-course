/* tslint:disable:no-hardcoded-credentials */

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { IAuth, IToken, IUser } from '../../entities/auth.model';
import { IAuthState } from '../../store/reducers/auth.reducer';
import { ICoursesState } from '../../store/reducers/courses.reducer';
import { IAppState } from '../../store/states';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let httpTestingController: HttpTestingController;
  let service: AuthService;
  let store: MockStore<IAppState>;

  const initialState: IAppState = {
    courses: {} as ICoursesState,
    auth: {} as IAuthState,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService, provideMockStore({ initialState })],
    });

    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(AuthService);
    store = TestBed.get(Store);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('WHILE logging in', () => {
    it('should make a POST request to /auth/login and return token', () => {
      const fakeAuthData: IAuth = {
        login: 'user',
        password: 'pass',
      };

      const mockResponse: IToken = {
        token: 'TOKEN',
      };

      service.logIn(fakeAuthData).subscribe(res => {
        expect(res.token).toEqual('TOKEN');
      });

      const req = httpTestingController.expectOne('http://localhost:3004/auth/login');
      expect(req.request.method).toEqual('POST');

      req.flush(mockResponse);
    });

    it('should make a POST request to /auth/userinfo using token from Local Storage as a header and return user data', () => {
      const mockResponse: IUser = {
        fakeToken: 'TOKEN',
        id: 0,
        name: {
          first: 'John',
          last: 'Doe',
        },
        role: 'admin',
      };

      spyOn(localStorage, 'getItem').and.returnValue('TOKEN');

      service.getUserInfo().subscribe(res => {
        expect(res).toEqual(mockResponse);
      });

      expect(localStorage.getItem).toHaveBeenCalled();

      const req = httpTestingController.expectOne('http://localhost:3004/auth/userinfo');
      expect(req.request.method).toEqual('POST');
      expect(req.request.headers.has('Authorization')).toBeTruthy();
      expect(req.request.headers.get('Authorization')).toEqual('TOKEN');

      req.flush(mockResponse);
    });
  });

  describe('WHILE checking for authentication', () => {
    let status: boolean;

    it('should return true if user is logged in and there is a valid token in Local Storage', () => {
      spyOn(localStorage, 'getItem').and.returnValue('TOKEN');
      status = service.isAuthenticated();
      expect(localStorage.getItem).toHaveBeenCalled();
      expect(status).toBeTruthy();
    });

    it('should return false if user is not logged in and there is no valid token in Local Storage', () => {
      spyOn(localStorage, 'getItem').and.returnValue(undefined);
      status = service.isAuthenticated();
      expect(localStorage.getItem).toHaveBeenCalled();
      expect(status).toBeFalsy();
    });
  });

  describe('WHILE checking for user\'s role', () => {
    it('should return false if user doesn\'t have an admin role', () => {
      store.setState({...initialState, auth: { ...initialState.auth, role: 'user' }});
      service.isAdmin().subscribe(res => {
        expect(res).toBeFalsy();
      });
    });

    it('should return true if user has an admin role', () => {
      store.setState({...initialState, auth: { ...initialState.auth, role: 'admin' }});
      service.isAdmin().subscribe(res => {
        expect(res).toBeTruthy();
      });
    });
  });
});
