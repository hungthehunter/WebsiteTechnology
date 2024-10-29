import { createSlice } from "@reduxjs/toolkit";
import { addressThunk } from "../thunks/thunk";

const initialState = {
    listAddress: [],
    selectedAddress: null,
    isLoading: false,
    isError: false,
};

const addressSlice = createSlice({
    name: "address",
    initialState,
    reducers: {
        clearSelectedAddressId: (state) => {
            state.selectedAddress = null;
        },
    },
    extraReducers: (builder) => {
        // getAllAddresses
        builder
            .addCase(addressThunk.getAllAddresses.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addressThunk.getAllAddresses.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.listAddress = action.payload;
            })
            .addCase(addressThunk.getAllAddresses.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            });

        // getAddressById
        builder
            .addCase(addressThunk.getAddressById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addressThunk.getAddressById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                if (action.payload && action.payload.id) {
                    state.selectedAddress = action.payload;
                } else {
                    console.error('Invalid payload received in getAddressById.fulfilled');
                }
            })
            .addCase(addressThunk.getAddressById.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
                state.selectedAddress = null;
            });

        // createAddress
        builder
            .addCase(addressThunk.createAddress.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addressThunk.createAddress.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.listAddress.push(action.payload);
            })
            .addCase(addressThunk.createAddress.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            });

        // updateAddress
        builder
            .addCase(addressThunk.updateAddress.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addressThunk.updateAddress.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                const index = state.listAddress.findIndex(address => address.id === action.payload.id);
                if (index !== -1) {
                    state.listAddress[index] = action.payload;
                }
            })
            .addCase(addressThunk.updateAddress.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            });

        // deleteAddress
        builder
            .addCase(addressThunk.deleteAddress.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addressThunk.deleteAddress.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.listAddress = state.listAddress.filter(address => address.id !== action.payload);
                if (state.selectedAddress === action.payload) {
                    state.selectedAddress = null;
                }
            })
            .addCase(addressThunk.deleteAddress.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            });
    },
});

export const { clearSelectedAddressId } = addressSlice.actions;
export default addressSlice.reducer;