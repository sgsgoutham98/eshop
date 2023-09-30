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
  allProducts: [
    // {
    //   id: 1,
    //   name: "Mobile",
    //   price: 1000,
    //   description:
    //     "The iPhone 14 features a 6.1-inch (155 mm) display with Super Retina XDR OLED technology at a resolution of 2532 × 1170 pixels and a pixel density of about 460 PPI with a refresh rate of 60 Hz. ",
    //   category: "Electronics",
    //   manufacturer: "Apple",
    //   availableItems: 10,
    //   imageUrl:
    //     "https://media.istockphoto.com/id/1371695315/photo/iphone-13-pro-sierra-blue.jpg?s=612x612&w=0&k=20&c=-0Mr9DdIRHFoLUozdltlHdkum0ChCNTGfLhxc-3oHmI=",
    // },
    // {
    //   id: 2,
    //   name: "Laptop",
    //   price: 2000,
    //   description:
    //     "Dell Inspiron is a Windows 10 laptop with a 15.60-inch display that has a resolution of 1920x1080 pixels. It is powered by a APU Quad Core A6 processor ",
    //   category: "Electronics",
    //   manufacturer: "Dell",
    //   availableItems: 10,
    //   imageUrl:
    //     "https://www.reliancedigital.in/medias/Dell-5520-Laptops-492850230-i-3-1200Wx1200H?context=bWFzdGVyfGltYWdlc3w0MzEyMDd8aW1hZ2UvanBlZ3xpbWFnZXMvaDRlL2gyYi85ODQ0NTM0MTQ5MTUwLmpwZ3w0YmU2YmYwMjM5NDQ0MGM1YmExNTY2NjdiNGIzNDVkZGFkMDYxYjczMDJhOTRhY2EzNDU0MmRkZjhlNDRiNTVi",
    // },
  ], // all products
  filteredProducts: [] // filtered products
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
