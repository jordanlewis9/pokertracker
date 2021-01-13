import { GET_SESSION, RESET_STATE } from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case GET_SESSION:
      console.log(action.payload);
      return {...state, editFormValues: action.payload};
    case RESET_STATE:
      return {...state, editFormValues: undefined};
    default:
      return state;
  }
}