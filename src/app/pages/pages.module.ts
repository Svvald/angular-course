import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { CoursesPageComponent } from './courses-page/courses-page.component';
import { SingleCoursePageComponent } from './single-course-page/single-course-page.component';
import { NoContentPageComponent } from './no-content-page/no-content-page.component';
import { LoginPageComponent } from './login-page/login-page.component';

import { SharedModule } from '../shared/shared.module';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
    declarations: [
        CoursesPageComponent,
        SingleCoursePageComponent,
        NoContentPageComponent,
        LoginPageComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        PipesModule,
        SharedModule,
    ],
    exports: [
        CoursesPageComponent,
        SingleCoursePageComponent,
        NoContentPageComponent,
        LoginPageComponent,
    ],
    providers: [],
})
export class PagesModule {}
