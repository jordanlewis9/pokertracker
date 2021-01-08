import axios from 'axios';
import { NEW_SESSION, GET_SESSION } from './types';
import { timeIntToStr } from '../components/utils/timeFunctions';

export const newSession = (formProps) => async (dispatch) => {
  const formattedLength = formProps.time_length.split(":").map(el => parseInt(el));
  formattedLength[1] = Math.round(formattedLength[1] * 5/3);
  formProps.time_length = parseFloat(formattedLength.join("."));
  formProps.buyin = parseFloat(formProps.buyin);
  formProps.cashout = parseFloat(formProps.cashout);
  // console.log(formProps);
  try {
    const response = await axios.post('http://localhost:5000/api/sessions/new', formProps);
    console.log(response);
    dispatch({
      type: NEW_SESSION,
      payload: formProps
    });
  } catch (err) {
    console.log(err);
  }
};

export const getSession = (sessionId) => async (dispatch) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/sessions/${sessionId}`);
    console.log(response);
    response.data.time_length = timeIntToStr(response.data.time_length);
    dispatch({
      type: GET_SESSION,
      payload: response.data
    });
  } catch (err) {
    console.log(err);
  }
}