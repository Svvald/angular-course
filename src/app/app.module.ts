import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { PagesModule } from './pages/pages.module';
import { PipesModule } from './pipes/pipes.module';
import { SharedModule } from './shared/shared.module';
import { ServicesModule } from './services/services.module';

import { AppComponent } from './app.component';

import { ROUTES } from './app.routes';

import { authReducer } from './store/reducers/auth.reducer';
import { coursesReducer } from './store/reducers/courses.reducer';

import { AuthEffects } from './store/effects/auth.effects';
import { CoursesEffects } from './store/effects/courses.effects';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    PagesModule,
    PipesModule,
    SharedModule,
    ServicesModule,
    RouterModule.forRoot(ROUTES),
    StoreModule.forRoot({ userdata: authReducer, courses: coursesReducer }),
    EffectsModule.forRoot([AuthEffects, CoursesEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: false
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
