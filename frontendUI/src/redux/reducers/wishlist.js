import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  wishlist: localStorage.getItem("wishlistItems")
    ? JSON.parse(localStorage.getItem("wishlistItems"))
    : [],
};

export const wishlistReducer = createReducer(initialState, {
  addToWishlist: (state, action) => {
    const item = action.payload;
    const isItemExist = state.wishlist.find((i) =>
      i.id ? i.id === item.id : i._id === item._id
    );
    if (isItemExist) {
      return {
        ...state,
        wishlist: state.wishlist.forEach((i) => {
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
        wishlist: [...state.wishlist, item],
      };
    }
  },

  removeFromWishlist: (state, action) => {
    return {
      ...state,
      wishlist: state.wishlist.filter((i) =>
        i.id ? i.id !== action.payload : i._id !== action.payload
      ),
    };
  },
});
