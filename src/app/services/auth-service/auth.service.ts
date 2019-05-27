import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IAuth, IToken, IUser } from '../../entities/auth.model';
import { getUserRole } from '../../store/selectors/auth.selectors';
import { IAppState } from '../../store/states';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly BASE_URL = 'http://localhost:3004/auth';

  constructor(private http: HttpClient, private store: Store<IAppState>) { }

  public isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  public isAdmin(): Observable<boolean> {
    return this.store.pipe(
      select(getUserRole),
      map(role => role.includes('admin')),
    );
  }

  public logIn(data: IAuth): Observable<IToken> {
    return this.http.post<IToken>(`${this.BASE_URL}/login`, data);
  }

  public getUserInfo(): Observable<IUser> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: token });

    return this.http.post<IUser>(`${this.BASE_URL}/userinfo`, {}, { headers });
  }
}
