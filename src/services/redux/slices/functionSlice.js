import { createSlice } from "@reduxjs/toolkit";
import { functionThunk } from "../thunks/thunk";

const initialState = {
    listFunction: [],
    selectedFunction: null,
    isLoading: false,
    isError: false,
};

const functionSlice = createSlice({
    name: "function",
    initialState,
    reducers: {
        clearSelectedFunctionId: (state) => {
            state.selectedFunction = null;
        },
    },
    extraReducers: (builder) => {
        // getAllFunctions
        builder
            .addCase(functionThunk.getAllFunctions.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(functionThunk.getAllFunctions.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.listFunction = action.payload;
            })
            .addCase(functionThunk.getAllFunctions.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            });
    },
});

export const { clearSelectedFunctionId } = functionSlice.actions;
export default functionSlice.reducer;