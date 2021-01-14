import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import sessionReducer from './session';
import authReducer from './auth';

export default combineReducers({
  form: formReducer,
  editFormValues: sessionReducer,
  auth: authReducer
})