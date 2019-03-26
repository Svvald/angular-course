import { AuthState } from '../reducers/auth.reducer';
import { CoursesState } from '../reducers/courses.reducer';

export interface ApplicationState {
    auth: AuthState;
    courses: CoursesState;
}
