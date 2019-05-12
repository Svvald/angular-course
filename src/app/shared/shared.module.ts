import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { CourseItemComponent } from './course-item/course-item.component';
import { CoursesControlsComponent } from './courses-controls/courses-controls.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LoaderComponent } from './loader/loader.component';
import { CourseDurationInputComponent } from './form-controls/course-duration-input/course-duration-input.component';
import { CourseDateInputComponent } from './form-controls/course-date-input/course-date-input.component';
import { CourseAuthorsInputComponent } from './form-controls/course-authors-input/course-authors-input.component';

import { DirectivesModule } from '../directives/directives.module';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
    declarations: [
        BreadcrumbsComponent,
        CourseItemComponent,
        CoursesControlsComponent,
        FooterComponent,
        HeaderComponent,
        LoaderComponent,
        CourseDurationInputComponent,
        CourseDateInputComponent,
        CourseAuthorsInputComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        FontAwesomeModule,
        DirectivesModule,
        PipesModule,
    ],
    exports: [
        BreadcrumbsComponent,
        CourseItemComponent,
        CoursesControlsComponent,
        FooterComponent,
        HeaderComponent,
        LoaderComponent,
        CourseDurationInputComponent,
        CourseDateInputComponent,
        CourseAuthorsInputComponent,
    ],
    providers: [],
})
export class SharedModule {}
