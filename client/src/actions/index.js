import { NEW_SESSION } from './types';

export const newSession = (formProps) => {
  return {
    type: NEW_SESSION,
    payload: formProps
  }
};