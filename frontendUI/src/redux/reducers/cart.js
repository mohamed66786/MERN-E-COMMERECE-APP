import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  cart: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
};

export const cartReducer = createReducer(initialState, {
  addToCart: (state, action) => {
    const item = action.payload;
    const isItemExist = state.cart.find((i) =>
      i.id ? i.id === item.id : i._id === item._id
    );
    if (isItemExist) {
      return {
        ...state,
        // cart: state.cart.map((i) => (i.id === isItemExist.id ? item : i)),
        cart: state.cart.forEach((i) => {
          if (i.id) {
            if (i.id === isItemExist.id) {
              return item;
            } else {
              return i;
            }
          } else if (i._id) {
            if (i._id === isItemExist._id) {
              return item;
            } else {
              return i;
            }
          }
        }),
      };
    } else {
      return {
        ...state,
        cart: [...state.cart, item],
      };
    }
  },
  removeFromCart: (state, action) => {
    return {
      ...state,
      cart: state.cart.filter((i) =>
        i.id ? i.id !== action.payload : i._id !== action.payload
      ),
    };
  },
});
