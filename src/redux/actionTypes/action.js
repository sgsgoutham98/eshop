import { ADD_TOKEN, REMOVE_TOKEN,ADD_PRODUCT } from './actionTypes';

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

export const filterProducts = (category) => ({
  type: 'FILTER_PRODUCTS',
  category,
});

export const searchProducts = (search) => ({
  type: 'SEARCH_PRODUCTS',
  search,
});

export const addProduct = product => {
  return {
    type: ADD_PRODUCT,
    payload: product
  };
};

export const setProducts = (products) => ({
  type: 'SET_PRODUCTS',
  payload: products,
});

export const updateProduct = (product) => {
  return {
    type: "UPDATE_PRODUCT",
    payload: product,
  };
};

export const deleteProduct = (id) => {
  return {
    type: "DELETE_PRODUCT",
    payload: id,
  };
};