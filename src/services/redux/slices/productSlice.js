import { createSlice } from "@reduxjs/toolkit";
import { productThunk } from "../thunks/thunk";
const initialState={
    listProduct:[],
    selectedProduct:null,
    isLoading:false,
    isError:false
}

const productSlice = createSlice({
name:"product",
initialState,
reducers:{
clearSelectedProductId:(state)=>{
    state.selectedProduct = null;
}
},
// state trong đây là initialState
extraReducers:(builder)=>{
 
// getAllProduct
    builder
    .addCase(productThunk.getAllProduct.pending,(state)=>{
    state.isLoading=true
    })
    builder
    .addCase(productThunk.getAllProduct.fulfilled,(state,action)=>{
     state.isLoading=false
     state.isError=false
     state.listProduct = action.payload
    })

    // getAllProduct
    builder
    .addCase(productThunk.getAllProduct.rejected,(state)=>{
        state.isLoading=false
        state.isError=true
       })

       // getProductById
       .addCase(productThunk.getProductById.pending, (state) => {
        state.isLoading = true
      })
      .addCase(productThunk.getProductById.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        if (action.payload && action.payload.id) {
          state.selectedProduct = action.payload;
        } else {
          console.error('Invalid payload received in getProductById.fulfilled')
        }
      })
      .addCase(productThunk.getProductById.rejected, (state) => {
        state.isLoading = false
        state.isError = true
        state.selectedProduct = null;
      })


    // createProduct
    builder
    .addCase(productThunk.createProduct.pending,(state)=>{
        state.isLoading=true
    })
    builder
    .addCase(productThunk.createProduct.fulfilled,(state,action)=>{
        state.isLoading=false
        state.isError=false
        state.listProduct.push(action.payload)
    })
    builder
    .addCase(productThunk.createProduct.rejected,(state)=>{
        state.isLoading=false
        state.isError=true
    })

    // updateProduct
    builder
    .addCase(productThunk.updateProduct.pending,(state)=>{
        state.isLoading=true
    })
    builder
    .addCase(productThunk.updateProduct.fulfilled,(state,action)=>{
        state.isLoading=false
        state.isError=false
        const index = state.listProduct.findIndex(product=>product.id === action.payload.id)
        if(index !== -1){
            state.listProduct[index] = action.payload
        }
    })
    builder
    .addCase(productThunk.updateProduct.rejected,(state)=>{
        state.isLoading=false
        state.isError=true
    })  

    // deleteProduct
    builder
    .addCase(productThunk.deleteProduct.pending,(state)=>{
        state.isLoading=true
    })
    builder
    .addCase(productThunk.deleteProduct.fulfilled,(state,action)=>{
        state.isLoading=false
        state.isError=false
        state.listProduct = state.listProduct.filter(product=>product.id !== action.payload)
        if(state.selectedProduct === action.payload){
            state.selectedProduct = null ;
        }
    })
    builder
    .addCase(productThunk.deleteProduct.rejected,(state)=>{
        state.isLoading=false
        state.isError=true
    })

}
})
export const { clearSelectedProductId} = productSlice.actions
export default productSlice.reducer