import { AUTH, SIGN_OUT } from '../actions/types';

const authReducer = (state = { auth: { id: null, email: null, username: null, ip: null }}, action) => {
  switch(action.type) {
    case AUTH:
      return {...state, auth: action.payload};
    case SIGN_OUT:
      return {...state, auth: { id: action.payload, email: action.payload, username: action.payload, ip: action.payload }};
    default:
      return state;
  }
}

export default authReducer;