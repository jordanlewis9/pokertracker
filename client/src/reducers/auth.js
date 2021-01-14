import { AUTH } from '../actions/types';

export default (state = { auth: { id: null, email: null, username: null, ip: null }}, action) => {
  switch(action.type) {
    case AUTH:
      return {...state, auth: action.payload};
    default:
      return state;
  }
}