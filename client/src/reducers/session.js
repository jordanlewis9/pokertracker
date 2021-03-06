import { GET_SESSION, RESET_STATE } from '../actions/types';

const sessionReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SESSION:
      return {...state, editFormValues: action.payload};
    case RESET_STATE:
      return {...state, editFormValues: undefined};
    default:
      return state;
  }
};

export default sessionReducer;