import axios from 'axios';
import { NEW_SESSION } from './types';

export const newSession = (formProps) => async (dispatch) => {
  const formattedLength = formProps.timeLength.split(":").map(el => parseInt(el));
  formattedLength[1] = Math.round(formattedLength[1] * 5/3);
  formProps.timeLength = parseFloat(formattedLength.join("."));
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