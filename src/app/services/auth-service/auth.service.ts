import { Injectable } from '@angular/core';

interface IUser {
  username: string;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _auth: boolean;

  constructor() { }

  get isAuthenticated() {
    return this._auth;
  }

  logIn(data: IUser): void {
    console.log('Logging in');
    Object.keys(data).map(key => localStorage.setItem(key, data[key]));
    this._auth = true;
  }

  logOut(): void {
    console.log('Logging out');
    localStorage.clear();
    this._auth = false;
  }

  getUserInfo(): string {
    return localStorage.getItem('username');
  }
}
