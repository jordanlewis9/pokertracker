import { GET_USER, RESET_STATE } from '../actions/types';

const userReducer = (state = {}, action) => {
  switch(action.type){
    case GET_USER:
      return {...state, editUserValues: action.payload};
    case RESET_STATE:
      return {...state, editUserValues: {email: null, first_name: null, last_name: null}};
    default:
      return state;
  }
}

export default userReducer;