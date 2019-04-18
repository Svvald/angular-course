import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { Action } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { switchMap, map, catchError, tap } from 'rxjs/operators';

import { CoursesService } from '../../services/courses-service/courses.service';
import { GetCourses, CoursesActionType, GetCoursesSuccess, GetCoursesFail, GetCourse, GetCourseSuccess, GetCourseFail, EditCourse, UpdateCourse, UpdateCourseSuccess, UpdateCourseFail, DeleteCourse, DeleteCourseSuccess, DeleteCourseFail, AddCourse, AddCourseSuccess, AddCourseFail, SearchCourses, SearchCoursesSuccess, SearchCoursesFail } from '../actions/courses.actions';
import { LoaderService } from '../../common/loader/service/loader.service';

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

    @Effect() deleteCourse$: Observable<Action> = this.actions$.pipe(
        ofType<DeleteCourse>(CoursesActionType.DELETE_COURSE),
        tap(_ => this.loaderService.toggle(true)),
        switchMap(action => this.coursesService.deleteCourse(action.payload).pipe(
            map(_ => new DeleteCourseSuccess())
        )),
        catchError(err => of(new DeleteCourseFail(err)))
    );

    @Effect({ dispatch: false }) deleteCourseSuccess$: Observable<Action> = this.actions$.pipe(
        ofType(CoursesActionType.DELETE_COURSE_SUCCESS),
        tap(_ => this.loaderService.toggle(false)),
    );

    @Effect({ dispatch: false }) deleteCourseFail$: Observable<Error> = this.actions$.pipe(
        ofType<DeleteCourseFail>(CoursesActionType.DELETE_COURSE_FAIL),
        map(action => action.payload),
        tap(err => console.error(err))
    );

    @Effect() addCourse$: Observable<Action> = this.actions$.pipe(
        ofType<AddCourse>(CoursesActionType.ADD_COURSE),
        tap(_ => this.loaderService.toggle(true)),
        switchMap(action => this.coursesService.createCourse(action.payload).pipe(
            map(_ => new AddCourseSuccess())
        )),
        catchError(err => of(new AddCourseFail(err)))
    );

    @Effect({ dispatch: false }) addCourseSuccess$: Observable<Action> = this.actions$.pipe(
        ofType(CoursesActionType.ADD_COURSE_SUCCESS),
        tap(_ => this.loaderService.toggle(false)),
        tap(_ => this.router.navigateByUrl('courses'))
    );

    @Effect({ dispatch: false }) addCourseFail$: Observable<Error> = this.actions$.pipe(
        ofType<AddCourseFail>(CoursesActionType.ADD_COURSE_FAIL),
        map(action => action.payload),
        tap(err => console.error(err))
    );

    @Effect() searchCourses$: Observable<Action> = this.actions$.pipe(
        ofType<SearchCourses>(CoursesActionType.SEARCH_COURSES),
        tap(_ => this.loaderService.toggle(true)),
        switchMap(action => this.coursesService.searchCourses(action.payload).pipe(
            map(courses => new SearchCoursesSuccess(courses))
        )),
        catchError(err => of(new SearchCoursesFail(err)))
    );

    @Effect({ dispatch: false }) searchCoursesFail$: Observable<Error> = this.actions$.pipe(
        ofType<SearchCoursesFail>(CoursesActionType.SEARCH_COURSES_FAIL),
        map(action => action.payload),
        tap(err => console.error(err))
    );

    @Effect({ dispatch: false }) searchCoursesSuccess$: Observable<Action> = this.actions$.pipe(
        ofType(CoursesActionType.SEARCH_COURSES_SUCCESS),
        tap(_ => this.loaderService.toggle(false))
    );

    constructor(
        private actions$: Actions,
        private coursesService: CoursesService,
        private loaderService: LoaderService,
        private router: Router
    ) { }
}
