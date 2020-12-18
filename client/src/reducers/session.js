import { NEW_SESSION } from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case NEW_SESSION:
      return {...state, form: action.payload};
    default:
      return state;
  }
}