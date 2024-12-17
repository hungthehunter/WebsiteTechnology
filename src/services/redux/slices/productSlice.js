import { createSlice } from "@reduxjs/toolkit";
import { productThunk } from "../thunks/thunk";
const initialState = {
  listProduct: [],
  listProductByManufacturer: [],
  selectedProduct: null,
  isLoading: false,
  isError: false,
  shouldReload: false,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    clearSelectedProductId: (state) => {
      state.selectedProduct = null;
    },
    updatedProduct: (state, action) => {
      const updatedProduct = action.payload;
      const productIndex = state.listProduct.findIndex(
        (product) => product.id === updatedProduct.id
      );
      if (productIndex !== -1) {
        state.listProduct[productIndex] = updatedProduct;
      }
    },
    addedProduct: (state,action) => {
    const newProduct = action.payload;
    state.listProduct.push(newProduct);
    },
    triggerReload: (state) => {
      state.shouldReload = true; // Đặt trạng thái cần reload
    },
    resetReload: (state) => {
      state.shouldReload = false; // Reset trạng thái sau khi reload
    },
  },
  // state trong đây là initialState
  extraReducers: (builder) => {
    // getAllProduct
    builder.addCase(productThunk.getAllProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(productThunk.getAllProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.shouldReload = false;
      state.listProduct = action.payload;
    });
    builder
      .addCase(productThunk.getAllProduct.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })

      // getProductById
      .addCase(productThunk.getProductById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(productThunk.getProductById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        if (action.payload && action.payload.id) {
          state.selectedProduct = action.payload;
        } else {
          console.error("Invalid payload received in getProductById.fulfilled");
        }
      })
      .addCase(productThunk.getProductById.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.selectedProduct = null;
      });

    //getProductByManufacturerId
    builder
      .addCase(productThunk.getAllProductByManufacturerId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        productThunk.getAllProductByManufacturerId.fulfilled,
        (state, action) => {
          state.isLoading = false;
          state.isError = false;
          state.listProductByManufacturer = action.payload;
        }
      )
      .addCase(productThunk.getAllProductByManufacturerId.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });

    // createProduct
    builder.addCase(productThunk.createProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(productThunk.createProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.listProduct.push(action.payload);
    });
    builder.addCase(productThunk.createProduct.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });

    // updateProduct
    builder.addCase(productThunk.updateProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(productThunk.updateProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      const updatedProduct = action.payload;
      const productIndex = state.listProduct.findIndex(
        (product) => product.id === updatedProduct.id
      );
      if (productIndex !== -1) {
        state.listProduct[productIndex] = updatedProduct;
      }
    });

    builder.addCase(productThunk.updateProduct.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });

    // deleteProduct
    builder.addCase(productThunk.deleteProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(productThunk.deleteProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.listProduct = state.listProduct.filter(
        (product) => product.id !== action.payload
      );
      if (state.selectedProduct === action.payload) {
        state.selectedProduct = null;
      }
    });
    builder.addCase(productThunk.deleteProduct.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});
export const {
  clearSelectedProductId,
  updatedProduct,
  addedProduct,
  triggerReload,
  resetReload,
} = productSlice.actions;
export default productSlice.reducer;
