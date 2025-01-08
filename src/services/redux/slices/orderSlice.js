import { createSlice } from "@reduxjs/toolkit";
import { orderThunk } from "../thunks/thunk";

const initialState = {
    listOrder: [],
    selectedOrder: null,
    isLoading: false,
    isError: false,
};

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        clearSelectedOrderId: (state) => {
            state.selectedOrder = null;
        },
        addOrder: (state,action) => {
           const newOrder = action.payload;
           state.listOrder.push(newOrder);
        },
        updatedOrders: (state,action) =>{
        const updatedOrder = action.payload;
        const orderIndex = state.listOrder.findIndex(
            (order) => order.id === updatedOrder.id
        );
        if(orderIndex !== -1){
            state.listOrder[orderIndex] = updatedOrder;
        }
        }
    },
    extraReducers: (builder) => {
        // getAllOrders
        builder
            .addCase(orderThunk.getAllOrders.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(orderThunk.getAllOrders.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.listOrder = action.payload;
            })
            .addCase(orderThunk.getAllOrders.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            });

        // getOrderById
        builder
            .addCase(orderThunk.getOrderById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(orderThunk.getOrderById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                if (action.payload && action.payload.id) {
                    state.selectedOrder = action.payload;
                } else {
                    console.error('Invalid payload received in getOrderById.fulfilled');
                }
            })
            .addCase(orderThunk.getOrderById.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
                state.selectedOrder = null;
            });

        // createOrder
        builder
            .addCase(orderThunk.createOrder.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(orderThunk.createOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.listOrder.push(action.payload);
            })
            .addCase(orderThunk.createOrder.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            });

        // updateOrder
        builder
            .addCase(orderThunk.updateOrder.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(orderThunk.updateOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                const updatedOrders = state.listOrder.map(order =>
                    order.id === action.payload.id ? action.payload : order
                );
                state.listOrder = updatedOrders; 
            })
            .addCase(orderThunk.updateOrder.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            });

        // deleteOrder
        builder
            .addCase(orderThunk.deleteOrder.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(orderThunk.deleteOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.listOrder = state.listOrder.filter(order => order.id !== action.payload);
                if (state.selectedOrder === action.payload) {
                    state.selectedOrder = null;
                }
            })
            .addCase(orderThunk.deleteOrder.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            });
    },
});

export const { clearSelectedOrderId , addOrder, updatedOrders } = orderSlice.actions;
export default orderSlice.reducer;