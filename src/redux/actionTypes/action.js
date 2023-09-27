import { ADD_TOKEN, REMOVE_TOKEN } from './actionTypes';

export const addToken = (token) => {
  return {
    type: ADD_TOKEN,
    payload: token,
  };
};

export const removeToken=()=>{
    return{
        type:REMOVE_TOKEN
    };
}