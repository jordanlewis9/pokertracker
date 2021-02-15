import { GET_USER, RESET_STATE } from '../actions/types';

const userReducer = (state = {}, action) => {
  switch(action.type){
    case GET_USER:
      console.log('user gotten')
      return {...state, editUserValues: action.payload};
    case RESET_STATE:
      console.log('this is from the userReducer');
      return {...state, editUserValues: undefined};
    default:
      return state;
  }
}

export default userReducer;