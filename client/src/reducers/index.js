import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import sessionReducer from './session';

export default combineReducers({
  form: formReducer,
  sessionReducer
})