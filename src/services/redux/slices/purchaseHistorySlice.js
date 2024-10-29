import { createSlice } from "@reduxjs/toolkit";
import { purchaseHistoryThunk } from "../thunks/thunk";

const initialState = {
    listPurchaseHistory: [],
    selectedPurchaseHistory: null,
    isLoading: false,
    isError: false,
};

const purchaseHistorySlice = createSlice({
    name: "purchaseHistory",
    initialState,
    reducers: {
        clearSelectedPurchaseHistoryId: (state) => {
            state.selectedPurchaseHistory = null;
        },
    },
    extraReducers: (builder) => {
        // getAllPurchaseHistories
        builder
            .addCase(purchaseHistoryThunk.getAllPurchaseHistories.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(purchaseHistoryThunk.getAllPurchaseHistories.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.listPurchaseHistory = action.payload;
            })
            .addCase(purchaseHistoryThunk.getAllPurchaseHistories.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            });

        // getPurchaseHistoryById
        builder
            .addCase(purchaseHistoryThunk.getPurchaseHistoryById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(purchaseHistoryThunk.getPurchaseHistoryById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                if (action.payload && action.payload.id) {
                    state.selectedPurchaseHistory = action.payload;
                } else {
                    console.error('Invalid payload received in getPurchaseHistoryById.fulfilled');
                }
            })
            .addCase(purchaseHistoryThunk.getPurchaseHistoryById.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
                state.selectedPurchaseHistory = null;
            });

        // createPurchaseHistory
        builder
            .addCase(purchaseHistoryThunk.createPurchaseHistory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(purchaseHistoryThunk.createPurchaseHistory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.listPurchaseHistory.push(action.payload);
            })
            .addCase(purchaseHistoryThunk.createPurchaseHistory.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            });

        // updatePurchaseHistory
        builder
            .addCase(purchaseHistoryThunk.updatePurchaseHistory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(purchaseHistoryThunk.updatePurchaseHistory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                const index = state.listPurchaseHistory.findIndex(purchaseHistory => purchaseHistory.id === action.payload.id);
                if (index !== -1) {
                    state.listPurchaseHistory[index] = action.payload;
                }
            })
            .addCase(purchaseHistoryThunk.updatePurchaseHistory.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            });

        // deletePurchaseHistory
        builder
            .addCase(purchaseHistoryThunk.deletePurchaseHistory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(purchaseHistoryThunk.deletePurchaseHistory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.listPurchaseHistory = state.listPurchaseHistory.filter(purchaseHistory => purchaseHistory.id !== action.payload);
                if (state.selectedPurchaseHistory === action.payload) {
                    state.selectedPurchaseHistory = null;
                }
            })
            .addCase(purchaseHistoryThunk.deletePurchaseHistory.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            });
    },
});

export const { clearSelectedPurchaseHistoryId } = purchaseHistorySlice.actions;
export default purchaseHistorySlice.reducer;