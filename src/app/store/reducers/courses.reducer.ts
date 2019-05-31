import { Course } from '../../entities/course.model';
import { CoursesActionType } from '../actions/courses.actions';

export interface ICoursesState {
    coursesList: Course[];
    selectedCourse: Course;
    coursesCount: number;
}

const initialState: ICoursesState = {
    coursesList: [],
    selectedCourse: {
        id: 0,
        date: new Date(0),
        description: '',
        isTopRated: false,
        length: 0,
        name: '',
        authors: [],
    },
    coursesCount: 5,
};

export function coursesReducer(state = initialState, action: any) {
    const COUNT_INC = 5;
    switch (action.type) {
        case CoursesActionType.GET_COURSES_SUCCESS:
            return {
                ...state,
                coursesList: action.payload,
            };
        case CoursesActionType.GET_COURSE_SUCCESS:
        case CoursesActionType.SEARCH_COURSES_SUCCESS:
            return {
                ...state,
                selectedCourse: action.payload,
            };
        case CoursesActionType.LOAD_MORE:
            return {
                ...state,
                coursesCount: state.coursesCount += COUNT_INC,
            };
        default:
            return state;
    }
}
