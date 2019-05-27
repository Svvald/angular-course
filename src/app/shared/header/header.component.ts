import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthService } from '../../services/auth-service/auth.service';
import { GetUserData, Logout } from '../../store/actions/auth.actions';
import { AuthState } from '../../store/reducers/auth.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {

  constructor(public authService: AuthService, private store: Store<AuthState>) { }

  public username: string;
  private unsubscribe$ = new Subject();

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.store.dispatch(new GetUserData());
    }

    this.store.select('userdata').pipe(
      takeUntil(this.unsubscribe$),
    ).subscribe(userdata =>
      this.username = `${userdata.name.first} ${userdata.name.last}`,
    );
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
  }

  onLogOut() {
    this.store.dispatch(new Logout());
  }

}
