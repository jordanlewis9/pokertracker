import { GET_SESSION, RESET_STATE } from '../actions/types';

const sessionReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SESSION:
      console.log('session added');
      return {...state, editFormValues: action.payload};
    case RESET_STATE:
      console.log('sessionReducer FROM')
      return {...state, editFormValues: undefined};
    default:
      return state;
  }
};

export default sessionReducer;