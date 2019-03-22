import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { IAuth, IUser, IToken } from '../../entities/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly BASE_URL = 'http://localhost:3004/auth';

  constructor(private http: HttpClient, private router: Router) { }

  public isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  public logIn(data: IAuth): Observable<IToken> {
    return this.http.post<IToken>(`${this.BASE_URL}/login`, data);
  }

  public getUserInfo(): Observable<IUser> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': token });

    return this.http.post<IUser>(`${this.BASE_URL}/userinfo`, {}, { headers });
  }
}
