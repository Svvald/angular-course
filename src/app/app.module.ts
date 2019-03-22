import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { PipesModule } from './pipes/pipes.module';

import { CourseHighlightDirective } from './directives/course-highlight/course-highlight.directive';

import { AppComponent } from './app.component';

import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';
import { BreadcrumbsComponent } from './common/breadcrumbs/breadcrumbs.component';
import { CoursesControlsComponent } from './common/courses-controls/courses-controls.component';
import { CourseItemComponent } from './common/course-item/course-item.component';
import { LoaderComponent } from './common/loader/component/loader.component';

import { CoursesPageComponent } from './pages/courses-page/courses-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SingleCoursePageComponent } from './pages/single-course-page/single-course-page.component';
import { NoContentPageComponent } from './pages/no-content-page/no-content-page.component';

import { TokenInterceptor } from './services/token-interceptor/token-interceptor';

import { ROUTES } from './app.routes';
import { StoreModule } from '@ngrx/store';
import { authReducer } from './store/reducers/auth.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './store/effects/auth.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  declarations: [
    AppComponent,

    BreadcrumbsComponent,
    HeaderComponent,
    FooterComponent,

    CoursesControlsComponent,
    CourseHighlightDirective,
    CourseItemComponent,

    CoursesPageComponent,
    LoginPageComponent,
    SingleCoursePageComponent,
    NoContentPageComponent,
    LoaderComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    PipesModule,
    FontAwesomeModule,
    RouterModule.forRoot(ROUTES),
    StoreModule.forRoot({ userdata: authReducer }),
    EffectsModule.forRoot([AuthEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: false
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
