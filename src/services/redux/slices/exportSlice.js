import { createSlice } from "@reduxjs/toolkit";
import { exportThunk } from "../thunks/thunk";

const initialState = {
  listExport: [],
  selectedExport: null,
  isLoading: false,
  isError: false,
};

const exportSlice = createSlice({
  name: "export",
  initialState,
  reducers: {
    clearSelectedExportId: (state) => {
      state.selectedExport = null;
    },
  },
  extraReducers: (builder) => {
    // getAllExports
    builder
      .addCase(exportThunk.getAllExports.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(exportThunk.getAllExports.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.listExport = action.payload;
      })
      .addCase(exportThunk.getAllExports.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });

    // getExportById
    builder
      .addCase(exportThunk.getExportById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(exportThunk.getExportById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        if (action.payload && action.payload.id) {
          state.selectedExport = action.payload;
        } else {
          console.error("Invalid payload received in getExportById.fulfilled");
        }
      })
      .addCase(exportThunk.getExportById.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.selectedExport = null;
      });

    // createExport
    builder
      .addCase(exportThunk.createExport.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(exportThunk.createExport.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.listExport.push(action.payload);
      })
      .addCase(exportThunk.createExport.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });

    // updateExport
    builder
      .addCase(exportThunk.updateExport.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(exportThunk.updateExport.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        const index = state.listExport.findIndex(
          (model) => model.id === action.payload.id
        );
        if (index !== -1) {
          state.listExport[index] = action.payload;
        }
      })
      .addCase(exportThunk.updateExport.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { clearSelectedExportId } = exportSlice.actions;
export default exportSlice.reducer;
