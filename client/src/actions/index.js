import axios from 'axios';
import { NEW_SESSION, GET_SESSION, EDIT_SESSION, RESET_STATE, SIGN_IN, AUTH, SIGN_OUT, SIGN_UP, GET_USER, EDIT_USER } from './types';
import { timeIntToStr } from '../components/utils/timeFunctions';

export const newSession = (formProps, user_id, callback) => async (dispatch) => {
  const user = localStorage.getItem('token');
  try {
    await axios.post(`https://poker-session-tracker.herokuapp.com/api/sessions/session?u_id=${user_id}`, formProps, {
      headers: {
        'Authorization': `Bearer ${user}`
      }
    });
    callback();
    dispatch({
      type: NEW_SESSION,
      payload: formProps
    });
  } catch (err) {
    callback(err.response);
  }
};

export const editSession = (formProps, id, userId, callback) => async (dispatch) => {
  const user = localStorage.getItem('token');
  try {
    await axios.put(`https://poker-session-tracker.herokuapp.com/api/sessions/session?session_id=${id}&u_id=${userId}`, formProps, {
      headers: { 'Authorization': `Bearer ${user}`}
    });
    callback();
    dispatch({
      type: EDIT_SESSION,
      payload: formProps
    });
  } catch (err) {
    callback(err.response);
  }
}

export const getSession = (sessionId, userId) => async (dispatch) => {
  const user = localStorage.getItem('token');
  try {
    const response = await axios.get(`https://poker-session-tracker.herokuapp.com/api/sessions/session?session_id=${sessionId}&u_id=${userId}`, {
      headers: { 'Authorization': `Bearer ${user}`}
    });
    response.data.time_length = timeIntToStr(response.data.time_length);
    response.data.date_play = response.data.date_play.substring(0, 10);
    dispatch({
      type: GET_SESSION,
      payload: response.data
    });
  } catch (err) {
    throw err;
  }
}

export const signIn = (formProps, callback) => async (dispatch) => {
  try {
    const response = await axios.post('https://poker-session-tracker.herokuapp.com/api/auth/signin', formProps);
    dispatch({
      type: SIGN_IN,
      payload: formProps
    });
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('id', response.data.id);
    if (response.data.id === 34) {
      callback(dispatch);
    } else {
      callback();
    }
  } catch (err) {
    console.log(err);
    callback(err.response.data.message);
  }
}

export const authUser = (callback) => async (dispatch) => {
  const user = localStorage.getItem('token');
  const id = localStorage.getItem('id');
  const hasUserLoggedOutOfDemo = localStorage.getItem('hasUserLoggedOut');
  if (!user && !hasUserLoggedOutOfDemo) {
    localStorage.setItem('hasUserLoggedOut', '');
    return dispatch(signIn({ 'username': 'demo', 'password': 'Thisisademo1!'}, authUser((error) => console.log(error))));
  } else if (!user) {
    return {
      type: AUTH,
      payload: null
    }
  };
  try {
    const response = await axios.get(`https://poker-session-tracker.herokuapp.com/api/users/user?u_id=${id}`, {
      headers: { 'Authorization': `Bearer ${user}`}
    });
    dispatch({
      type: AUTH,
      payload: response.data
    })
  } catch (err) {
    callback(err);
  }
}

export const signUp = (formProps, callback) => async (dispatch) => {
  try {
    await axios.post(`https://poker-session-tracker.herokuapp.com/api/auth/signup`, formProps);
    dispatch({
      type: SIGN_UP,
      payload: formProps
    });
    callback();
  } catch (err) {
    callback(err.response);
  }
}

export const getUser = (userId) => async (dispatch) => {
  const user = localStorage.getItem('token');
  try {
    const response = await axios.get(`https://poker-session-tracker.herokuapp.com/api/users/user?u_id=${userId}`, {
      headers: { 'Authorization': `Bearer ${user}`}
    })
    const { first_name, last_name, email } = response.data;
    const payload = {
      first_name,
      last_name,
      email
    }
    dispatch({
      type: GET_USER,
      payload
    })
  } catch (err) {
    throw err
  }
}

export const editUser = (formProps, userId, callback) => async (dispatch) => {
  const user = localStorage.getItem('token');
  try {
    await axios.put(`https://poker-session-tracker.herokuapp.com/api/users/user?u_id=${userId}`, formProps, {
      headers: { 'Authorization': `Bearer ${user}`}
    })
    dispatch({
      type: EDIT_USER,
      payload: formProps
    });
    callback();
  } catch (err) {
    callback(err.response)
  }
}

export const signOut = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('id');
  localStorage.setItem('hasUserLoggedOut', 'true');
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