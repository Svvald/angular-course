import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CoursesPageModule } from './courses-page/courses-page.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BreadcrumbsComponent,
  ],
  imports: [
    BrowserModule,
    CoursesPageModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
