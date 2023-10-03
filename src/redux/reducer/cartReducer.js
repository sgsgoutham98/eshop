import {
  ADD_TOKEN,
  REMOVE_TOKEN,
  ADD_PRODUCT,
} from "../actionTypes/actionTypes";

const initialState = {
  token: "",
  isLoggedIn: false,
  categories: [],
  products: [],
  productsSortOrder: "default",
  isAdmin: true,
  allProducts: [],
  filteredProducts: []
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TOKEN:
      return {
        ...state,
        token: action.payload.headers['x-auth-token'],
        isLoggedIn: true,
        isAdmin: action.payload.data.roles[0].includes("ADMIN")
      };

    case REMOVE_TOKEN:
      return {
        ...state,
        token: "",
        isLoggedIn: false,
      };
    case "FILTER_PRODUCTS": {
      console.log("In reducer" + action.category);
      return {
        ...state,
        filteredProducts:
          action.category === "ALL"
            ? state.allProducts
            : state.allProducts.filter(
                (product) =>
                  product.category.toLowerCase() ===
                  action.category.toLowerCase()
              ),
      };
      
    }
    case "SEARCH_PRODUCTS": {
      console.log("In reducer" + action.search);
      return {
        ...state,
        filteredProducts: state.allProducts.filter((product) =>
          product.name.toLowerCase().includes(action.search.toLowerCase())
        ),
      };
    }

    case 'SET_PRODUCTS':
      return {
        ...state,
        allProducts: action.payload,
        filteredProducts:action.payload
      };

    case ADD_PRODUCT: {
      console.log("ADD_PRODUCT --> "+JSON.stringify(action.payload))
      return {
        ...state,
        allProducts: [...state.allProducts, action.payload],
      };
    }

    case "UPDATE_PRODUCT":
      return {
        ...state,
        allProducts: state.allProducts.map((product) => product.id === action.payload.id ? action.payload : product),
        filteredProducts: state.allProducts.map((product) => product.id === action.payload.id ? action.payload : product)
      };
    case "DELETE_PRODUCT":
      return{
      ...state,
      allProducts:state.allProducts.filter((product) => product.id !== action.payload),
      filteredProducts:state.filteredProducts.filter((product) => product.id !== action.payload)
    }
    

    default:
      return state;
  }
};

export default cartReducer;
