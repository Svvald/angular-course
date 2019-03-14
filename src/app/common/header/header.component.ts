import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth-service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public authService: AuthService, private router: Router) { }

  public username: string;

  ngOnInit() {
    this.authService.getUserInfo().subscribe(
      res => this.username = `${res.name.first} ${res.name.last}`,
      err => console.error(err.message)
    );
  }

  onLogOut() {
    this.authService.logOut();
    this.router.navigateByUrl('login');
  }

}
