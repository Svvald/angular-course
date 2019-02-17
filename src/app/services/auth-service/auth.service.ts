import { Injectable } from '@angular/core';

interface IUser {
  username: string;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _auth = true;

  constructor() { }

  get isAuthenticated() {
    return this._auth;
  }

  logIn(data: IUser): void {
    Object.keys(data).map(key => localStorage.setItem(key, data[key]));
    this._auth = true;
  }

  logOut(): void {
    localStorage.clear();
    this._auth = false;
  }

  getUserInfo(): string {
    return localStorage.getItem('username');
  }
}
