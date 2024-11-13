import { createSlice } from "@reduxjs/toolkit";
import { importThunk } from "../thunks/thunk";

const initialState = {
  listImport: [],
  selectedImport: null,
  isLoading: false,
  isError: false,
};

const importSlice = createSlice({
  name: "import",
  initialState,
  reducers: {
    clearSelectedImportId: (state) => {
      state.selectedImport = null;
    },
  },
  extraReducers: (builder) => {
    // getAllImports
    builder
      .addCase(importThunk.getAllImports.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(importThunk.getAllImports.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.listImport = action.payload;
      })
      .addCase(importThunk.getAllImports.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });

    // getImportById
    builder
      .addCase(importThunk.getImportById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(importThunk.getImportById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        if (action.payload && action.payload.id) {
          state.selectedImport = action.payload;
        } else {
          console.error("Invalid payload received in getImportById.fulfilled");
        }
      })
      .addCase(importThunk.getImportById.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.selectedImport = null;
      });

    // createImport
    builder
      .addCase(importThunk.createImport.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(importThunk.createImport.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.listImport.push(action.payload);
      })
      .addCase(importThunk.createImport.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });

    // updateImport
    builder
      .addCase(importThunk.updateImport.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(importThunk.updateImport.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        const index = state.listImport.findIndex(
          (model) => model.id === action.payload.id
        );
        if (index !== -1) {
          state.listImport[index] = action.payload;
        }
      })
      .addCase(importThunk.updateImport.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { clearSelectedImportId } = importSlice.actions;
export default importSlice.reducer;
