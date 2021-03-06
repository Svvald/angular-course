import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';

import { CoursesService } from '../../services/courses-service/courses.service';
import { LoaderService } from '../../services/loader-service/loader.service';
import { AddCourse,
         AddCourseFail,
         AddCourseSuccess,
         CourseActionFail,
         CoursesActionType,
         DeleteCourse,
         DeleteCourseFail,
         DeleteCourseSuccess,
         EditCourse,
         GetCourse,
         GetCourseFail,
         GetCourses,
         GetCoursesFail,
         GetCoursesSuccess,
         GetCourseSuccess,
         SearchCourses,
         SearchCoursesFail,
         SearchCoursesSuccess,
         UpdateCourse,
         UpdateCourseFail,
         UpdateCourseSuccess,
         ViewCourse,
} from '../actions/courses.actions';
import { IAppState } from '../states';

@Injectable()
export class CoursesEffects {
    @Effect() getCourses$: Observable<Action> = this.actions$.pipe(
        ofType<GetCourses>(CoursesActionType.GET_COURSES),
        tap(_ => this.loaderService.toggle(true)),
        switchMap(action => this.coursesService.getCourses(action.payload).pipe(
            map(courses => new GetCoursesSuccess(courses)),
        )),
        catchError(err => of(new GetCoursesFail(err))),
    );

    @Effect({ dispatch: false }) getCoursesSuccess$: Observable<Action> = this.actions$.pipe(
        ofType(CoursesActionType.GET_COURSES_SUCCESS),
        tap(_ => this.loaderService.toggle(false)),
    );

    @Effect() getCourse$: Observable<Action> = this.actions$.pipe(
        ofType<GetCourse>(CoursesActionType.GET_COURSE),
        tap(_ => this.loaderService.toggle(true)),
        switchMap(action => this.coursesService.getCourse(action.payload).pipe(
            map(course => new GetCourseSuccess(course)),
        )),
        catchError(err => of(new GetCourseFail(err))),
    );

    @Effect({ dispatch: false }) getCourseSuccess$: Observable<Action> = this.actions$.pipe(
        ofType(CoursesActionType.GET_COURSE_SUCCESS),
        tap(_ => this.loaderService.toggle(false)),
    );

    @Effect() editCourse$: Observable<Action> = this.actions$.pipe(
        ofType<EditCourse>(CoursesActionType.EDIT_COURSE),
        map(action => action.payload),
        tap(id => this.router.navigateByUrl(`courses/edit/${id}`)),
        map(id => new GetCourse(id)),
    );

    @Effect() updateCourse$: Observable<Action> = this.actions$.pipe(
        ofType<UpdateCourse>(CoursesActionType.UPDATE_COURSE),
        tap(_ => this.loaderService.toggle(true)),
        switchMap(action => this.coursesService.updateCourse(action.payload).pipe(
            map(_ => new UpdateCourseSuccess()),
        )),
        catchError(err => of(new UpdateCourseFail(err))),
    );

    @Effect({ dispatch: false }) updateCourseSuccess$: Observable<Action> = this.actions$.pipe(
        ofType(CoursesActionType.UPDATE_COURSE_SUCCESS),
        tap(_ => this.loaderService.toggle(false)),
        tap(_ => this.router.navigateByUrl('courses')),
    );

    @Effect() deleteCourse$: Observable<Action> = this.actions$.pipe(
        ofType<DeleteCourse>(CoursesActionType.DELETE_COURSE),
        tap(_ => this.loaderService.toggle(true)),
        switchMap(action => this.coursesService.deleteCourse(action.payload).pipe(
            map(_ => new DeleteCourseSuccess()),
        )),
        catchError(err => of(new DeleteCourseFail(err))),
    );

    @Effect() deleteCourseSuccess$: Observable<Action> = this.actions$.pipe(
        ofType(CoursesActionType.DELETE_COURSE_SUCCESS),
        tap(_ => this.loaderService.toggle(false)),
        withLatestFrom(this.store),
        map(actionAndState => new GetCourses(actionAndState[1].courses.coursesCount))
    );

    @Effect() addCourse$: Observable<Action> = this.actions$.pipe(
        ofType<AddCourse>(CoursesActionType.ADD_COURSE),
        tap(_ => this.loaderService.toggle(true)),
        switchMap(action => this.coursesService.createCourse(action.payload).pipe(
            map(_ => new AddCourseSuccess()),
        )),
        catchError(err => of(new AddCourseFail(err))),
    );

    @Effect({ dispatch: false }) addCourseSuccess$: Observable<Action> = this.actions$.pipe(
        ofType(CoursesActionType.ADD_COURSE_SUCCESS),
        tap(_ => this.loaderService.toggle(false)),
        tap(_ => this.router.navigateByUrl('courses')),
    );

    @Effect() searchCourses$: Observable<Action> = this.actions$.pipe(
        ofType<SearchCourses>(CoursesActionType.SEARCH_COURSES),
        tap(_ => this.loaderService.toggle(true)),
        switchMap(action => this.coursesService.searchCourses(action.payload).pipe(
            map(courses => new SearchCoursesSuccess(courses)),
        )),
        catchError(err => of(new SearchCoursesFail(err))),
    );

    @Effect({ dispatch: false }) searchCoursesSuccess$: Observable<Action> = this.actions$.pipe(
        ofType(CoursesActionType.SEARCH_COURSES_SUCCESS),
        tap(_ => this.loaderService.toggle(false)),
    );

    @Effect() viewCourse: Observable<Action> = this.actions$.pipe(
        ofType<ViewCourse>(CoursesActionType.VIEW_COURSE),
        map(action => action.payload),
        tap(id => this.router.navigateByUrl(`courses/${id}`)),
        map(id => new GetCourse(id)),
    );

    @Effect({ dispatch: false }) coursesGeneralError$: Observable<Error> = this.actions$.pipe(
        ofType<CourseActionFail>(
            CoursesActionType.GET_COURSE_FAIL,
            CoursesActionType.GET_COURSES_FAIL,
            CoursesActionType.ADD_COURSE_FAIL,
            CoursesActionType.DELETE_COURSE_FAIL,
            CoursesActionType.UPDATE_COURSE_FAIL,
            CoursesActionType.SEARCH_COURSES_FAIL,
        ),
        map(action => action.payload),
        tap(err => console.error(err)),
    );

    @Effect() loadMore$: Observable<Action> = this.actions$.pipe(
        ofType(CoursesActionType.LOAD_MORE),
        withLatestFrom(this.store),
        map(actionAndState => new GetCourses(actionAndState[1].courses.coursesCount)),
    );

    constructor(
        private actions$: Actions,
        private coursesService: CoursesService,
        private loaderService: LoaderService,
        private router: Router,
        private store: Store<IAppState>,
    ) { }
}
