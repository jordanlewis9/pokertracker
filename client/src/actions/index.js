import { NEW_SESSION } from './types';

export const newSession = (formProps) => {
  const formattedLength = formProps.timeLength.split(":").map(el => parseInt(el));
  formattedLength[1] = Math.round(formattedLength[1] * 5/3);
  formProps.timeLength = parseFloat(formattedLength.join("."));
  formProps.buyin = parseFloat(formProps.buyin);
  formProps.cashout = parseFloat(formProps.cashout);
  console.log(formProps);
  return {
    type: NEW_SESSION,
    payload: formProps
  }
};