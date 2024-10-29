import { createSlice } from "@reduxjs/toolkit";
import { invoiceThunk } from "../thunks/thunk";

const initialState = {
    listInvoice: [],
    selectedInvoice: null,
    isLoading: false,
    isError: false,
};

const invoiceSlice = createSlice({
    name: "invoice",
    initialState,
    reducers: {
        clearSelectedInvoiceId: (state) => {
            state.selectedInvoice = null;
        },
    },
    extraReducers: (builder) => {
        // getAllInvoices
        builder
            .addCase(invoiceThunk.getAllInvoices.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(invoiceThunk.getAllInvoices.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.listInvoice = action.payload;
            })
            .addCase(invoiceThunk.getAllInvoices.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            });

        // getInvoiceById
        builder
            .addCase(invoiceThunk.getInvoiceById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(invoiceThunk.getInvoiceById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                if (action.payload && action.payload.id) {
                    state.selectedInvoice = action.payload;
                } else {
                    console.error('Invalid payload received in getInvoiceById.fulfilled');
                }
            })
            .addCase(invoiceThunk.getInvoiceById.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
                state.selectedInvoice = null;
            });

        // createInvoice
        builder
            .addCase(invoiceThunk.createInvoice.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(invoiceThunk.createInvoice.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.listInvoice.push(action.payload);
            })
            .addCase(invoiceThunk.createInvoice.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            });

        // updateInvoice
        builder
            .addCase(invoiceThunk.updateInvoice.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(invoiceThunk.updateInvoice.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                const index = state.listInvoice.findIndex(invoice => invoice.id === action.payload.id);
                if (index !== -1) {
                    state.listInvoice[index] = action.payload;
                }
            })
            .addCase(invoiceThunk.updateInvoice.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            });

        // deleteInvoice
        builder
            .addCase(invoiceThunk.deleteInvoice.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(invoiceThunk.deleteInvoice.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.listInvoice = state.listInvoice.filter(invoice => invoice.id !== action.payload);
                if (state.selectedInvoice === action.payload) {
                    state.selectedInvoice = null;
                }
            })
            .addCase(invoiceThunk.deleteInvoice.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            });
    },
});

export const { clearSelectedInvoiceId } = invoiceSlice.actions;
export default invoiceSlice.reducer;