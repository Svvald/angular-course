import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IAuth } from 'src/app/entities/auth.model';
import { Login } from 'src/app/store/actions/auth.actions';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(private store: Store<any>) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      login: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  onLoginClick() {
    const data = this.combineLoginData();
    this.store.dispatch(new Login(data));
  }

  private combineLoginData(): IAuth {
    return ({
      login: this.loginForm.get('login').value,
      password: this.loginForm.get('password').value
    });
  }

  hasErrors(controlName: string): boolean {
    const control = this.loginForm.get(controlName);
    return control.dirty && control.invalid;
  }

  hasError(controlName: string, errorName: string) {
    const control = this.loginForm.get(controlName);
    return control.dirty && control.hasError(errorName);
  }
}
