import { createStore } from 'redux';

const initialState = {
  currentPage: 1,
  product: [],
};

const rootReducer = (state = initialState, action) => {
  console.log("this is reducer", state);
  switch (action.type) {
    case 'SET_CURRENT_PAGE':
      return { ...state, currentPage: action.payload };
    case 'SET_PRODUCT':
      return { ...state, product: action.payload };
    default:
      return state;
  }
};

const store = createStore(rootReducer);

export default store;
