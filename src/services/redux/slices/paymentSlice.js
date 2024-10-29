import { createSlice } from "@reduxjs/toolkit";
import { paymentThunk } from "../thunks/thunk";

const initialState = {
    listPayment: [],
    selectedPayment: null,
    isLoading: false,
    isError: false,
};

const paymentSlice = createSlice({
    name: "payment",
    initialState,
    reducers: {
        clearSelectedPaymentId: (state) => {
            state.selectedPayment = null;
        },
    },
    extraReducers: (builder) => {
        // getAllPayments
        builder
            .addCase(paymentThunk.getAllPayments.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(paymentThunk.getAllPayments.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.listPayment = action.payload;
            })
            .addCase(paymentThunk.getAllPayments.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            });

        // getPaymentById
        builder
            .addCase(paymentThunk.getPaymentById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(paymentThunk.getPaymentById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                if (action.payload && action.payload.id) {
                    state.selectedPayment = action.payload;
                } else {
                    console.error('Invalid payload received in getPaymentById.fulfilled');
                }
            })
            .addCase(paymentThunk.getPaymentById.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
                state.selectedPayment = null;
            });

        // createPayment
        builder
            .addCase(paymentThunk.createPayment.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(paymentThunk.createPayment.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.listPayment.push(action.payload);
            })
            .addCase(paymentThunk.createPayment.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            });

        // updatePayment
        builder
            .addCase(paymentThunk.updatePayment.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(paymentThunk.updatePayment.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                const index = state.listPayment.findIndex(payment => payment.id === action.payload.id);
                if (index !== -1) {
                    state.listPayment[index] = action.payload;
                }
            })
            .addCase(paymentThunk.updatePayment.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            });

        // deletePayment
        builder
            .addCase(paymentThunk.deletePayment.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(paymentThunk.deletePayment.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.listPayment = state.listPayment.filter(payment => payment.id !== action.payload);
                if (state.selectedPayment === action.payload) {
                    state.selectedPayment = null;
                }
            })
            .addCase(paymentThunk.deletePayment.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            });
    },
});

export const { clearSelectedPaymentId } = paymentSlice.actions;
export default paymentSlice.reducer;