// Redux slice for managing cart state
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  searchQuery: '',
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Add product to cart
    addToCart: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        // If product already in cart, increase quantity
        existingItem.quantity += 1;
      } else {
        // Add new product to cart with quantity 1
        state.items.push({
          ...action.payload,
          quantity: 1,
        });
      }
    },

    // Remove product from cart
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    // Update product quantity in cart
    updateQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity = Math.max(1, action.payload.quantity); // Ensure quantity doesn't go below 1
      }
    },

    // Clear entire cart
    clearCart: (state) => {
      state.items = [];
    },

    // Set search query
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  setSearchQuery,
} = cartSlice.actions;

// Selectors
export const selectCartItems = (state) => state.cart.items;
export const selectCartTotal = (state) =>
  state.cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
export const selectCartItemCount = (state) =>
  state.cart.items.reduce((count, item) => count + item.quantity, 0);
export const selectSearchQuery = (state) => state.cart.searchQuery;

export default cartSlice.reducer;
