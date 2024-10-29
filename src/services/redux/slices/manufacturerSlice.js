import { createSlice } from "@reduxjs/toolkit";
import { manufacturerThunk } from "../thunks/thunk";

const initialState = {
    listManufacturer: [],
    selectedManufacturer: null,
    isLoading: false,
    isError: false,
};

const manufacturerSlice = createSlice({
    name: "manufacturer",
    initialState,
    reducers: {
        clearSelectedManufacturerId: (state) => {
            state.selectedManufacturer = null;
        },
    },
    extraReducers: (builder) => {
        // getAllManufacturers
        builder
            .addCase(manufacturerThunk.getAllManufacturers.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(manufacturerThunk.getAllManufacturers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.listManufacturer = action.payload;
            })
            .addCase(manufacturerThunk.getAllManufacturers.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            });

        // getManufacturerById
        builder
            .addCase(manufacturerThunk.getManufacturerById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(manufacturerThunk.getManufacturerById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                if (action.payload && action.payload.id) {
                    state.selectedManufacturer = action.payload;
                } else {
                    console.error('Invalid payload received in getManufacturerById.fulfilled');
                }
            })
            .addCase(manufacturerThunk.getManufacturerById.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
                state.selectedManufacturer = null;
            });

        // createManufacturer
        builder
            .addCase(manufacturerThunk.createManufacturer.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(manufacturerThunk.createManufacturer.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.listManufacturer.push(action.payload);
            })
            .addCase(manufacturerThunk.createManufacturer.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            });

        // updateManufacturer
        builder
            .addCase(manufacturerThunk.updateManufacturer.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(manufacturerThunk.updateManufacturer.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                const index = state.listManufacturer.findIndex(manufacturer => manufacturer.id === action.payload.id);
                if (index !== -1) {
                    state.listManufacturer[index] = action.payload;
                }
            })
            .addCase(manufacturerThunk.updateManufacturer.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            });

        // deleteManufacturer
        builder
            .addCase(manufacturerThunk.deleteManufacturer.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(manufacturerThunk.deleteManufacturer.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.listManufacturer = state.listManufacturer.filter(manufacturer => manufacturer.id !== action.payload);
                if (state.selectedManufacturer === action.payload) {
                    state.selectedManufacturer = null;
                }
            })
            .addCase(manufacturerThunk.deleteManufacturer.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            });
    },
});

export const { clearSelectedManufacturerId } = manufacturerSlice.actions;
export default manufacturerSlice.reducer;