import { createSlice } from "@reduxjs/toolkit";
import { summaryThunk } from "../thunks/thunk";

const initialState = {
    listSummary: [],
    selectedSummary: null,
    isLoading: false,
    isError: false,
};

const summarySlice = createSlice({
    name: "summary",
    initialState,
    reducers: {
        clearSelectedSummaryId: (state) => {
            state.selectedSummary = null;
        },
        updateSummary: (state, action) => {
            const updatedSummary = action.payload;
            const summaryIndex = state.listSummary.findIndex((summary) => summary.id === updatedSummary.id);
            if (summaryIndex !== -1) {
              state.listSummary[summaryIndex] = updatedSummary;
            }
          },
    },
    extraReducers: (builder) => {
        // getAllSummary
        builder
            .addCase(summaryThunk.getAllSummary.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(summaryThunk.getAllSummary.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.listSummary = action.payload;
            })
            .addCase(summaryThunk.getAllSummary.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            });
    },
});

export const { clearSelectedSummaryId , updateSummary } = summarySlice.actions;
export default summarySlice.reducer;