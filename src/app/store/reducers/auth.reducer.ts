import { IUser } from 'src/app/entities/auth.model';
import { AuthActionType } from '../actions/auth.actions';

export type IAuthState = IUser;

const initialState: IAuthState = {
    id: 0,
    fakeToken: '',
    name: {
        first: '',
        last: '',
    },
    role: '',
};

// TODO: Figure out how to deal with Action and payload
export function authReducer(state = initialState, action: any): IAuthState {
    switch (action.type) {
        case AuthActionType.LOGIN_SUCCESS:
            return action.payload;
        case AuthActionType.LOGOUT_SUCCESS:
            return initialState;
        default:
            return state;
    }
}
