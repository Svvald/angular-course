import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

interface IAuth {
  login: string;
  password: string;
}

interface IUser {
  id: number;
  fakeToken: string;
  name: {
    first: string;
    last: string;
  };
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly BASE_URL = 'http://localhost:3004/auth';

  constructor(private http: HttpClient, private router: Router) { }

  public isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  public logIn(data: IAuth): void {
    this.http.post(`${this.BASE_URL}/login`, data).subscribe(
      res => {
        Object.keys(res).map(key => localStorage.setItem(key, res[key]));
        this.router.navigateByUrl('courses');
      },
      error => console.error(error.message)
    );
  }

  public logOut(): void {
    localStorage.clear();
  }

  public getUserInfo(): Observable<IUser> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': token });

    return this.http.post<IUser>(`${this.BASE_URL}/userinfo`, {}, { headers });
  }
}
