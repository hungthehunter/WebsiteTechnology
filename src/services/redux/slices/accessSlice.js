import { createSlice } from "@reduxjs/toolkit";
import { accessThunk } from "../thunks/thunk";

const initialState = {
    listAccess: [],
    selectedAccess: null,
    isLoading: false,
    isError: false,
};

const accessSlice = createSlice({
    name: "access",
    initialState,
    reducers: {
        clearSelectedAccessId: (state) => {
            state.selectedAccess = null;
        },
        removeAccessFromList: (state, action) => {
            state.listAccess = state.listAccess.filter(access => access.id !== action.payload);
        },
        addToAccess: (state , action) => {
            state.listAccess.push(action.payload);
        }
    },
    extraReducers: (builder) => {
        // getAllAccess
        builder
            .addCase(accessThunk.getAllAccess.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(accessThunk.getAllAccess.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.listAccess = action.payload;
            })
            .addCase(accessThunk.getAllAccess.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            });

        // getAccessById
        builder
            .addCase(accessThunk.getAccessById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(accessThunk.getAccessById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                if (action.payload && action.payload.id) {
                    state.selectedAccess = action.payload;
                } else {
                    console.error('Invalid payload received in getAccessById.fulfilled');
                }
            })
            .addCase(accessThunk.getAccessById.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
                state.selectedAccess = null;
            });

        // createAccess
        builder
            .addCase(accessThunk.createAccess.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(accessThunk.createAccess.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.listAccess.push(action.payload);
            })
            .addCase(accessThunk.createAccess.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            });

        // updateAccess
        builder
            .addCase(accessThunk.updateAccess.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(accessThunk.updateAccess.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                const index = state.listAccess.findIndex(access => access.id === action.payload.id);
                if (index !== -1) {
                    state.listAccess[index] = action.payload;
                }
            })
            .addCase(accessThunk.updateAccess.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            });

        // deleteAccess
        builder
            .addCase(accessThunk.deleteAccess.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(accessThunk.deleteAccess.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.listAccess = state.listAccess.filter(access => access.id !== action.payload);
                if (state.selectedAccess === action.payload) {
                    state.selectedAccess = null;
                }
            })
            .addCase(accessThunk.deleteAccess.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            });
    },
});

export const { clearSelectedAccessId ,removeAccessFromList , addToAccess } = accessSlice.actions;
export default accessSlice.reducer;