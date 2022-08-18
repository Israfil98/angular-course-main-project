import { User } from './../user.model';

export interface AuthState {
  user: User | null;
}

const initialState = {
  user: null,
};

export function authReducer(state: AuthState = initialState, action) {
  switch (action.type) {
    case '':
      return {
        ...state,
      };
    default:
      return state;
  }
}
