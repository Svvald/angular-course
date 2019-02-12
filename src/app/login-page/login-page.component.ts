import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth-service/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  public email: string;
  public password: string;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onLoginClick() {
    this.authService.logIn({username: 'Username', token: 'TOKEN'});
  }

}
