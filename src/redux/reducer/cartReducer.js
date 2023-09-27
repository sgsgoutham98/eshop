import { ADD_TOKEN } from "../actionTypes/actionTypes";

const initialState = {
  token: "",
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TOKEN:
      return {
        ...state, 
        token: action.payload
          };
    default:
      return state;
  }
};

export default cartReducer;
