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

import { OrderByPipe } from './courses-page/orderby-pipe/orderby.pipe';
import { FilterPipe } from './courses-page/filter-pipe/filter.pipe';

import { ROUTES } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BreadcrumbsComponent,
    LoginPageComponent,
    OrderByPipe,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    CoursesPageModule,
    FormsModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [OrderByPipe, FilterPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
