import { Route } from '@angular/router';

import { CourseViewPageComponent } from './pages/course-view-page/course-view-page.component';
import { CoursesPageComponent } from './pages/courses-page/courses-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { NoContentPageComponent } from './pages/no-content-page/no-content-page.component';
import { SingleCoursePageComponent } from './pages/single-course-page/single-course-page.component';

import { AdminGuard } from './guards/admin/admin.guard';
import { AuthGuard } from './guards/auth/auth.guard';

export const ROUTES: Route[] = [
  { path: '', redirectTo: 'courses', pathMatch: 'full' },
  { path: 'courses', component: CoursesPageComponent, canActivate: [AuthGuard] },
  { path: 'courses/:id', component: CourseViewPageComponent, canActivate: [AuthGuard] },
  { path: 'courses/edit/:id', component: SingleCoursePageComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'courses/new', component: SingleCoursePageComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'login', component: LoginPageComponent },
  { path: '**', component: NoContentPageComponent },
];
