import { Route } from '@angular/router';

import { CoursesPageComponent } from './courses-page/courses-page.component';
import { SingleCoursePageComponent } from './single-course-page/single-course-page.component';
import { NoContentPageComponent } from './no-content-page/no-content-page.component';
import { LoginPageComponent } from './login-page/login-page.component';

export const ROUTES: Route[] = [
  { path: '', redirectTo: 'courses', pathMatch: 'full' },
  { path: 'courses', component: CoursesPageComponent },
  { path: 'courses/:id', component: SingleCoursePageComponent },
  { path: 'courses/new', component: SingleCoursePageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: '**', component: NoContentPageComponent }
];
