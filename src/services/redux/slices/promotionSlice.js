import { createSlice } from "@reduxjs/toolkit";
import { promotionThunk } from "../thunks/thunk";

const initialState = {
    listPromotion: [],
    selectedPromotion: null,
    isLoading: false,
    isError: false,
    shouldReload: false,
};

const promotionSlice = createSlice({
    name: "promotion",
    initialState,
    reducers: {
        clearSelectedPromotionId: (state) => {
            state.selectedPromotion = null;
        },
        updatePromotion: (state, action) => {
            const updatedPromotion = action.payload;
            const promotionIndex = state.listPromotion.findIndex((promotion) => promotion.id === updatedPromotion.id);
            if (promotionIndex !== -1) {
              state.listPromotion[promotionIndex] = updatedPromotion;
            }
          },
          triggerReload: (state) => {
            state.shouldReload = true; // Đặt trạng thái cần reload
          },
          resetReload: (state) => {
            state.shouldReload = false; // Reset trạng thái sau khi reload
          },
    },
    extraReducers: (builder) => {
        // getAllPromotions
        builder
            .addCase(promotionThunk.getAllPromotions.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(promotionThunk.getAllPromotions.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.listPromotion = action.payload;
            })
            .addCase(promotionThunk.getAllPromotions.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            });

        // getPromotionById
        builder
            .addCase(promotionThunk.getPromotionById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(promotionThunk.getPromotionById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                if (action.payload && action.payload.id) {
                    state.selectedPromotion = action.payload;
                } else {
                    console.error('Invalid payload received in getPromotionById.fulfilled');
                }
            })
            .addCase(promotionThunk.getPromotionById.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
                state.selectedPromotion = null;
            });

        // createPromotion
        builder
            .addCase(promotionThunk.createPromotion.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(promotionThunk.createPromotion.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.listPromotion.push(action.payload);
            })
            .addCase(promotionThunk.createPromotion.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            });

        // updatePromotion
        builder
            .addCase(promotionThunk.updatePromotion.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(promotionThunk.updatePromotion.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                const index = state.listPromotion.findIndex(promotion => promotion.id === action.payload.id);
                if (index !== -1) {
                    state.listPromotion[index] = action.payload;
                }
            })
            .addCase(promotionThunk.updatePromotion.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            });

        // deletePromotion
        builder
            .addCase(promotionThunk.deletePromotion.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(promotionThunk.deletePromotion.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.listPromotion = state.listPromotion.filter(promotion => promotion.id !== action.payload);
                if (state.selectedPromotion === action.payload) {
                    state.selectedPromotion = null;
                }
            })
            .addCase(promotionThunk.deletePromotion.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            });
    },
});

export const { clearSelectedPromotionId , updatePromotion , resetReload,triggerReload } = promotionSlice.actions;
export default promotionSlice.reducer;