import { Route } from '@angular/router';

import { CoursesPageComponent } from './pages/courses-page/courses-page.component';
import { SingleCoursePageComponent } from './pages/single-course-page/single-course-page.component';
import { NoContentPageComponent } from './pages/no-content-page/no-content-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';

import { AuthGuard } from './guards/auth/auth.guard';

export const ROUTES: Route[] = [
  { path: '', redirectTo: 'courses', pathMatch: 'full' },
  { path: 'courses', component: CoursesPageComponent, canActivate: [AuthGuard] },
  { path: 'courses/:id', component: SingleCoursePageComponent, canActivate: [AuthGuard] },
  { path: 'courses/new', component: SingleCoursePageComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginPageComponent },
  { path: '**', component: NoContentPageComponent }
];
