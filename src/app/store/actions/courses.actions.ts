/* tslint:disable:max-classes-per-file */

import { Action } from '@ngrx/store';

import { Course } from '../../entities/course.model';

export const CoursesActionType = {
    GET_COURSES: '[Courses] Getting courses',
    GET_COURSES_SUCCESS: '[Courses] Getting courses succeed',
    GET_COURSES_FAIL: '[Courses] Getting courses failed',
    GET_COURSE: '[Courses] Getting course',
    GET_COURSE_SUCCESS: '[Courses] Getting course succeed',
    GET_COURSE_FAIL: '[Courses] Getting course failed',
    EDIT_COURSE: '[Courses] Editing course',
    UPDATE_COURSE: '[Courses] Updating course',
    UPDATE_COURSE_SUCCESS: '[Courses] Updating course succeed',
    UPDATE_COURSE_FAIL: '[Courses] Updating course failed',
    DELETE_COURSE: '[Courses] Deleting course',
    DELETE_COURSE_SUCCESS: '[Courses] Deleting course succeed',
    DELETE_COURSE_FAIL: '[Courses] Deleting course failed',
    ADD_COURSE: '[Courses] Adding course',
    ADD_COURSE_SUCCESS: '[Courses] Adding course succeed',
    ADD_COURSE_FAIL: '[Courses] Adding course failed',
    SEARCH_COURSES: '[Courses] Search courses',
    SEARCH_COURSES_SUCCESS: '[Courses] Search courses succeed',
    SEARCH_COURSES_FAIL: '[Courses] Search courses failed',
    VIEW_COURSE: '[Courses] Viewing course',
};

export class GetCourses implements Action {
    readonly type = CoursesActionType.GET_COURSES;
    constructor(public payload: number) { }
}

export class GetCoursesSuccess implements Action {
    readonly type = CoursesActionType.GET_COURSES_SUCCESS;
    constructor(public payload: Course[]) { }
}

export class GetCoursesFail implements Action {
    readonly type = CoursesActionType.GET_COURSES_FAIL;
    constructor(public payload: Error) { }
}

export class GetCourse implements Action {
    readonly type = CoursesActionType.GET_COURSE;
    constructor(public payload: number) { }
}

export class GetCourseSuccess implements Action {
    readonly type = CoursesActionType.GET_COURSE_SUCCESS;
    constructor(public payload: Course) { }
}

export class GetCourseFail implements Action {
    readonly type = CoursesActionType.GET_COURSE_FAIL;
    constructor(public payload: Error) { }
}

export class EditCourse implements Action {
    readonly type = CoursesActionType.EDIT_COURSE;
    constructor(public payload: number) { }
}

export class UpdateCourse implements Action {
    readonly type = CoursesActionType.UPDATE_COURSE;
    constructor(public payload: Course) { }
}

export class UpdateCourseSuccess implements Action {
    readonly type = CoursesActionType.UPDATE_COURSE_SUCCESS;
}

export class UpdateCourseFail implements Action {
    readonly type = CoursesActionType.UPDATE_COURSE_FAIL;
    constructor(public payload: Error) { }
}

export class DeleteCourse implements Action {
    readonly type = CoursesActionType.DELETE_COURSE;
    constructor(public payload: number) { }
}

export class DeleteCourseSuccess implements Action {
    readonly type = CoursesActionType.DELETE_COURSE_SUCCESS;
}

export class DeleteCourseFail implements Action {
    readonly type = CoursesActionType.DELETE_COURSE_FAIL;
    constructor(public payload: Error) { }
}

export class AddCourse implements Action {
    readonly type = CoursesActionType.ADD_COURSE;
    constructor(public payload: Course) { }
}

export class AddCourseSuccess implements Action {
    readonly type = CoursesActionType.ADD_COURSE_SUCCESS;
}

export class AddCourseFail implements Action {
    readonly type = CoursesActionType.ADD_COURSE_FAIL;
    constructor(public payload: Error) { }
}

export class SearchCourses implements Action {
    readonly type = CoursesActionType.SEARCH_COURSES;
    constructor(public payload: string) { }
}

export class SearchCoursesSuccess implements Action {
    readonly type = CoursesActionType.SEARCH_COURSES_SUCCESS;
    constructor(public payload: Course[]) { }
}

export class SearchCoursesFail implements Action {
    readonly type = CoursesActionType.SEARCH_COURSES_FAIL;
    constructor(public payload: Error) { }
}

export class ViewCourse implements Action {
    readonly type = CoursesActionType.VIEW_COURSE;
    constructor(public payload: number) { }
}

export type CourseActionFail = GetCoursesFail | GetCourseFail | UpdateCourseFail | DeleteCourseFail | AddCourseFail;
