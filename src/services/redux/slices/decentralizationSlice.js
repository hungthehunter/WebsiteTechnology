import { createSlice } from "@reduxjs/toolkit";
import { decentralizationThunk } from "../thunks/thunk";

const initialState = {
    listDecentralization: [],
    selectedDecentralization: null,
    isLoading: false,
    isError: false,
};

const decentralizationSlice = createSlice({
    name: "decentralization",
    initialState,
    reducers: {
        clearSelectedDecentralizationId: (state) => {
            state.selectedDecentralization = null;
        },

    },
    extraReducers: (builder) => {
        // getAllDecentralizations
        builder
            .addCase(decentralizationThunk.getAllDecentralization.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(decentralizationThunk.getAllDecentralization.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.listDecentralization = action.payload;
            })
            .addCase(decentralizationThunk.getAllDecentralization.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            });

        // getDecentralizationById
        builder
            .addCase(decentralizationThunk.getDecentralizationById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(decentralizationThunk.getDecentralizationById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                if (action.payload && action.payload.id) {
                    state.selectedDecentralization = action.payload;
                } else {
                    console.error('Invalid payload received in getDecentralizationById.fulfilled');
                }
            })
            .addCase(decentralizationThunk.getDecentralizationById.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
                state.selectedDecentralization = null;
            });

        // createDecentralization
        builder
            .addCase(decentralizationThunk.createDecentralization.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(decentralizationThunk.createDecentralization.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.listDecentralization.push(action.payload);
            })
            .addCase(decentralizationThunk.createDecentralization.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            });

        // updateDecentralization
        builder
            .addCase(decentralizationThunk.updateDecentralization.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(decentralizationThunk.updateDecentralization.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                const index = state.listDecentralization.findIndex(decentralization => decentralization.id === action.payload.id);
                if (index !== -1) {
                    state.listDecentralization[index] = action.payload;
                }
            })
            .addCase(decentralizationThunk.updateDecentralization.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            });

        // deleteDecentralization
        builder
            .addCase(decentralizationThunk.deleteDecentralization.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(decentralizationThunk.deleteDecentralization.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.listDecentralization = state.listDecentralization.filter(decentralization => decentralization.id !== action.payload);
                if (state.selectedDecentralization === action.payload) {
                    state.selectedDecentralization = null;
                }
            })
            .addCase(decentralizationThunk.deleteDecentralization.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            });
    },
});

export const { clearSelectedDecentralizationId} = decentralizationSlice.actions;
export default decentralizationSlice.reducer;