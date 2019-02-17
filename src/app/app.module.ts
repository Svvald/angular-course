import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { CoursesPageModule } from './courses-page/courses-page.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { LoginPageComponent } from './login-page/login-page.component';

import { ROUTES } from './app.routes';
import { SingleCoursePageComponent } from './single-course-page/single-course-page.component';
import { PipesModule } from './pipes/pipes.module';
import { NoContentPageComponent } from './no-content-page/no-content-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BreadcrumbsComponent,
    LoginPageComponent,
    SingleCoursePageComponent,
    NoContentPageComponent,
  ],
  imports: [
    BrowserModule,
    CoursesPageModule,
    FormsModule,
    PipesModule,
    RouterModule.forRoot(ROUTES)
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
