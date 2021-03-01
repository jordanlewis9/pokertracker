import { GET_USER, RESET_STATE } from '../actions/types';

const userReducer = (state = {}, action) => {
  switch(action.type){
    case GET_USER:
      return {...state, editUserValues: action.payload};
    case RESET_STATE:
      return {...state, editUserValues: undefined};
    default:
      return state;
  }
}

export default userReducer;