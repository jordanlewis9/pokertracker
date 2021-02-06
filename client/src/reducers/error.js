import { ERROR } from '../actions/types';

const errorReducer = (state = null, action) => {
  switch(action.type){
    case ERROR:
      return {...state, error: action.payload};
    default:
      return state;
  }
}

export default errorReducer;