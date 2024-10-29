import { createSlice } from "@reduxjs/toolkit";
import { cartThunk } from "../thunks/thunk";

const initialState = {
  listCartItems: [],
  selectedCartItem: [],
  isLoading: false,
  isError: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearSelectedCartItemId: (state) => {
      state.selectedCartItem = null;
    },
    clearUserCart: (state) =>{
      state.listCartItems =null;
    },
    addToCart: (state, action) => {
      const { product, quantity } = action.payload;
      const existingProduct = state?.listCartItems?.find(
        (item) => item?.id === product?.id
      );
      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        state.listCartItems.push({ ...product, quantity });
      }
    },
    decreaseItemQuantity: (state, action) => {
      const itemIndex = state.listCartItems.findIndex(item => item.id === action.payload);
      if (itemIndex !== -1 && state.listCartItems[itemIndex].quantity > 1) {
        state.listCartItems[itemIndex].quantity -= 1;
      }
    },
  },
  extraReducers: (builder) => {
    // getAllCartItems
    builder
      .addCase(cartThunk.getAllCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(cartThunk.getAllCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.listCartItems = action.payload;
      })
      .addCase(cartThunk.getAllCartItems.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });

    // getUserCart
    builder
      .addCase(cartThunk.getUserCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(cartThunk.getUserCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.listCartItems = action.payload || [];
      })
      .addCase(cartThunk.getUserCart.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });

    // getCartItemById
    builder
      .addCase(cartThunk.getCartItemById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(cartThunk.getCartItemById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        if (action.payload && action.payload.id) {
          state.selectedCartItem = action.payload;
        } else {
          console.error(
            "Invalid payload received in getCartItemById.fulfilled"
          );
        }
      })
      .addCase(cartThunk.getCartItemById.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.selectedCartItem = null;
      });

    // addToCart
    builder
      .addCase(cartThunk.addToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(cartThunk.addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        if (action.payload) {
            if (!state.listCartItems) {
                state.listCartItems = [];
            }
            state.listCartItems.push(action.payload);
        }
    })
      .addCase(cartThunk.addToCart.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });

    // updateCartItem
    builder
      .addCase(cartThunk.updateCartItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(cartThunk.updateCartItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        const index = state.listCartItems.findIndex(
          (cartItem) => cartItem.id === action.payload.id
        );
        if (index !== -1) {
          state.listCartItems[index] = action.payload;
        }
      })
      .addCase(cartThunk.updateCartItem.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });

    // removeFromCart
    builder
      .addCase(cartThunk.removeFromCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(cartThunk.removeFromCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.listCartItems = state.listCartItems.filter(
          (cartItem) => cartItem.id !== action.payload
        );
        if (state.selectedCartItem === action.payload) {
          state.selectedCartItem = null;
        }
      })
      .addCase(cartThunk.removeFromCart.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { clearSelectedCartItemId, addToCart , decreaseItemQuantity , clearUserCart} = cartSlice.actions;
export default cartSlice.reducer;
