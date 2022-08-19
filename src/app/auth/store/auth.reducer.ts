import { User } from './../user.model';
import * as AuthActions from '../store/auth.actions';

export interface AuthState {
  user: User | null;
}

const initialState = {
  user: null,
};

export function authReducer(
  state: AuthState = initialState,
  action: AuthActions.AuthActionTypes
) {
  switch (action.type) {
    case AuthActions.LOGIN:
      const newUser = new User(
        action.payload.email,
        action.payload.id,
        action.payload.token,
        action.payload.expirationDate
      );
      return {
        ...state,
        user: newUser,
      };
    case AuthActions.LOGOUT:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}
