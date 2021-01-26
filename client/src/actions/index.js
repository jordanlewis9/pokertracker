import axios from 'axios';
import { NEW_SESSION, GET_SESSION, EDIT_SESSION, RESET_STATE, SIGN_IN, AUTH, SIGN_OUT, SIGN_UP } from './types';
import { timeIntToStr, formatToDBTime } from '../components/utils/timeFunctions';

export const newSession = (formProps, user_id, callback) => async (dispatch) => {
  formProps.time_length = formatToDBTime(formProps.time_length);
  formProps.buyin = parseFloat(formProps.buyin);
  formProps.cashout = parseFloat(formProps.cashout);
  formProps.user_id = user_id;
  // console.log(formProps);
  try {
    const response = await axios.post('http://localhost:5000/api/sessions/new', formProps);
    callback();
    dispatch({
      type: NEW_SESSION,
      payload: formProps
    });
  } catch (err) {
    console.log(err);
  }
};

export const editSession = (formProps, id, callback) => async (dispatch) => {
  formProps.time_length = formatToDBTime(formProps.time_length);
  formProps.buyin = parseFloat(formProps.buyin);
  formProps.cashout = parseFloat(formProps.cashout);
  try {
    const response = await axios.put(`http://localhost:5000/api/sessions/${id}`, formProps);
    callback();
    dispatch({
      type: EDIT_SESSION,
      payload: formProps
    });
  } catch (err) {
    console.log(err);
  }
}

export const getSession = (sessionId) => async (dispatch) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/sessions/session/${sessionId}`);
    console.log(response);
    response.data.time_length = timeIntToStr(response.data.time_length);
    response.data.date_play = response.data.date_play.substring(0, 10);
    dispatch({
      type: GET_SESSION,
      payload: response.data
    });
  } catch (err) {
    console.log(err);
  }
}

export const signIn = (formProps, callback) => async(dispatch) => {
  try {
    const response = await axios.post('http://localhost:5000/api/auth/signin', formProps);
    dispatch({
      type: SIGN_IN,
      payload: formProps
    });
    console.log('before local');
    localStorage.setItem('user_id', response.data.id);
    callback();
  } catch (err) {
    console.log(err);
  }
}

export const authUser = () => async (dispatch) => {
  const user = localStorage.getItem('user_id');
  if (!user) {
    return {
      type: AUTH,
      payload: null
    }
  };
  try {
    const response = await axios.get(`http://localhost:5000/api/auth/getUser/${user}`);
    dispatch({
      type: AUTH,
      payload: response.data
    })
  } catch (err) {
    console.log(err);
  }
}

export const signUp = (formProps, callback) => async (dispatch) => {
  try {
    console.log(formProps);
    const response = await axios.post(`http://localhost:5000/api/auth/signup`, formProps);
    signIn({ username: formProps.username, password: formProps.password }, () => null);
    dispatch({
      type: SIGN_UP,
      payload: formProps
    });
    callback();
  } catch (err) {
    console.log(err);
  }
}

export const signOut = () => {
  localStorage.removeItem('user_id');
  return {
    type: SIGN_OUT,
    payload: null
  }
};

export const resetState = () => {
  return {
  type: RESET_STATE,
  payload: undefined
  }
};