import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../services/auth-service/auth.service';
import { GetUserData, Logout } from '../../store/actions/auth.actions';
import { IAuthState } from '../../store/reducers/auth.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {

  constructor(public authService: AuthService,
              private store: Store<IAuthState>,
              private translate: TranslateService,
  ) { }

  public username: string;
  public readonly languages = ['en', 'ru'];
  private unsubscribe$ = new Subject();

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.store.dispatch(new GetUserData());
    }

    this.store.select('auth').pipe(
      takeUntil(this.unsubscribe$),
    ).subscribe(userdata =>
      this.username = `${userdata.name.first} ${userdata.name.last}`,
    );
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
  }

  public onLogOut(): void {
    this.store.dispatch(new Logout());
  }

  public onLanguageChange(event): void {
    this.translate.use(event.target.value);
  }
}
