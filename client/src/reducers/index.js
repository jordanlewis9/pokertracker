import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import sessionReducer from './session';
import authReducer from './auth';
import userReducer from './user';

export default combineReducers({
  form: formReducer,
  editFormValues: sessionReducer,
  editUserValues: userReducer,
  auth: authReducer
})