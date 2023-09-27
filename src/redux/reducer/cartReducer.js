import { ADD_TOKEN,REMOVE_TOKEN } from "../actionTypes/actionTypes";

const initialState = {
  token: "",
  isLoggedIn: false
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TOKEN:
      return {
        ...state, 
        token: action.payload,
        isLoggedIn: true
          };

    case REMOVE_TOKEN:
        return{
            ...state,
            token:"",
            isLoggedIn:false

        }   ;   
    default:
      return state;
  }
};

export default cartReducer;
