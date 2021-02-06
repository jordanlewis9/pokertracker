import { AUTH, SIGN_OUT } from '../actions/types';

const authReducer = (state = { id: null, email: null, username: null, ip: null }, action) => {
  switch(action.type) {
    case AUTH:
      return {...state, id: action.payload.id, email: action.payload.email, username: action.payload.username, ip: action.payload.ip};
    case SIGN_OUT:
      return {...state, id: action.payload, email: action.payload, username: action.payload, ip: action.payload };
    default:
      return state;
  }
}

export default authReducer;