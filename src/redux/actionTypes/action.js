import { ADD_TOKEN } from './actionTypes';

export const addToken = (token) => {
  return {
    type: ADD_TOKEN,
    payload: token,
  };
};