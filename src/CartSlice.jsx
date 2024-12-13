import { createSlice } from '@reduxjs/toolkit';
export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
    productCounter: 0,
    addedItems: {},
  },
  reducers: {
    addItem: (state, action) => {
      const { name, image, cost } = action.payload;
      const existingItem = state.items.find(item => item.name === name);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ name, image, cost, quantity: 1, });
      }
      state.productCounter++;
    },
    decrementQuantity: (state, action) => {
      const { name, image, cost } = action.payload;
      const existingItem = state.items.find(item => item.name === name);
      if (existingItem && existingItem.quantity > 0) {
        existingItem.quantity--;
      }
      if (state.productCounter > 0){
        state.productCounter--;
      }
    },
    removeItem: (state, action) => {
      const { name } = action.payload;
      state.items = state.items.filter(item => item.name !== name);
      let tempCount = 0;
      state.items.forEach((item) => {
        tempCount += item.quantity;
      });
      state.productCounter = tempCount;
    },
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const itemToUpdate = state.items.find(item => item.name === name);
      if (itemToUpdate) {
        itemToUpdate.quantity = quantity;
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity, decrementQuantity } = CartSlice.actions;

export default CartSlice.reducer;
