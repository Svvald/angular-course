import { Injectable } from "@angular/core";
import { Action } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { switchMap, map, catchError, tap } from 'rxjs/operators';

import { CoursesService } from '../../services/courses-service/courses.service';
import { GetCourses, CoursesActionType, GetCoursesSuccess, GetCoursesFail, GetCourse, GetCourseSuccess, GetCourseFail, EditCourse, UpdateCourse, UpdateCourseSuccess, UpdateCourseFail } from '../actions/courses.actions';
import { LoaderService } from '../../common/loader/service/loader.service';
import { Router } from '@angular/router';

@Injectable()
export class CoursesEffects {
    @Effect() getCourses$: Observable<Action> = this.actions$.pipe(
        ofType<GetCourses>(CoursesActionType.GET_COURSES),
        tap(_ => this.loaderService.toggle(true)),
        switchMap(action => this.coursesService.getCourses(action.payload).pipe(
            map(courses => new GetCoursesSuccess(courses))
        )),
        catchError(err => of(new GetCoursesFail(err)))
    );

    @Effect({ dispatch: false }) getCoursesFailed$: Observable<Error> = this.actions$.pipe(
        ofType<GetCoursesFail>(CoursesActionType.GET_COURSES_FAIL),
        map(action => action.payload),
        tap(err => console.error(err))
    );

    @Effect({ dispatch: false }) getCoursesSuccess$: Observable<Action> = this.actions$.pipe(
        ofType(CoursesActionType.GET_COURSES_SUCCESS),
        tap(_ => this.loaderService.toggle(false))
    );

    @Effect() getCourse$: Observable<Action> = this.actions$.pipe(
        ofType<GetCourse>(CoursesActionType.GET_COURSE),
        tap(_ => this.loaderService.toggle(true)),
        switchMap(action => this.coursesService.getCourse(action.payload).pipe(
            map(course => new GetCourseSuccess(course))
        )),
        catchError(err => of(new GetCourseFail(err)))
    );

    @Effect({ dispatch: false }) getCourseFailed$: Observable<Error> = this.actions$.pipe(
        ofType<GetCourseFail>(CoursesActionType.GET_COURSE_FAIL),
        map(action => action.payload),
        tap(err => console.error(err))
    );

    @Effect({ dispatch: false }) getCourseSuccess$: Observable<Action> = this.actions$.pipe(
        ofType(CoursesActionType.GET_COURSE_SUCCESS),
        tap(_ => this.loaderService.toggle(false))
    );

    @Effect() editCourse$: Observable<Action> = this.actions$.pipe(
        ofType<EditCourse>(CoursesActionType.EDIT_COURSE),
        map(action => action.payload),
        tap(id => this.router.navigateByUrl(`courses/${id}`)),
        map(id => new GetCourse(id))
    );

    @Effect() updateCourse$: Observable<Action> = this.actions$.pipe(
        ofType<UpdateCourse>(CoursesActionType.UPDATE_COURSE),
        tap(_ => this.loaderService.toggle(true)),
        switchMap(action => this.coursesService.updateCourse(action.payload).pipe(
            map(_ => new UpdateCourseSuccess())
        )),
        catchError(err => of(new UpdateCourseFail(err)))
    );

    @Effect({ dispatch: false }) updateCourseSuccess$: Observable<Action> = this.actions$.pipe(
        ofType(CoursesActionType.UPDATE_COURSE_SUCCESS),
        tap(_ => this.loaderService.toggle(false)),
        tap(_ => this.router.navigateByUrl('courses'))
    );

    // TODO: Merge all fail effects using action types union
    @Effect({ dispatch: false }) updateCourseFail$: Observable<Error> = this.actions$.pipe(
        ofType<UpdateCourseFail>(CoursesActionType.UPDATE_COURSE_FAIL),
        map(action => action.payload),
        tap(err => console.error(err))
    );

    constructor(
        private actions$: Actions,
        private coursesService: CoursesService,
        private loaderService: LoaderService,
        private router: Router
    ) { }
}
