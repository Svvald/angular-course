import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { IAuth } from 'src/app/entities/auth.model';
import { Login } from 'src/app/store/actions/auth.actions';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  public login: string;
  public password: string;

  constructor(private store: Store<any>) { }

  ngOnInit() { }

  onLoginClick() {
    const payload: IAuth = {
      login: this.login,
      password: this.password
    };

    this.store.dispatch(new Login(payload));
  }

}
