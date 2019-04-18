import { Course } from '../../entities/course.model';
import { CoursesActionType } from '../actions/courses.actions';

export type CoursesState = {
    coursesList: Course[];
    selectedCourse: Course;
};

const initialState: CoursesState = {
    coursesList: [],
    selectedCourse: {
        id: 0,
        date: new Date(0),
        description: '',
        isTopRated: false,
        length: 0,
        name: ''
    }
};

export function coursesReducer(state = initialState, action: any) {
    switch (action.type) {
        case CoursesActionType.GET_COURSES_SUCCESS:
            return {
                ...state,
                coursesList: action.payload
            };
        case CoursesActionType.GET_COURSE_SUCCESS:
            return {
                ...state,
                selectedCourse: action.payload
            };
        case CoursesActionType.SEARCH_COURSES_SUCCESS:
            return {
                ...state,
                coursesList: action.payload
            };
        default:
            return state;
    }
}
