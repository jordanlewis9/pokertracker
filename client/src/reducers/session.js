import { GET_SESSION } from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case GET_SESSION:
      return {...state, editFormValues: action.payload};
    default:
      return state;
  }
}