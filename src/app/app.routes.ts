import { Route } from '@angular/router';
import { CoursesPageComponent } from './courses-page/courses-page.component';

export const ROUTES: Route[] = [
  { path: 'courses', component: CoursesPageComponent },
  { path: '', redirectTo: 'courses', pathMatch: 'full' }
];
