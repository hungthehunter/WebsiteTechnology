import { createSlice } from "@reduxjs/toolkit";
import { reviewThunk } from "../thunks/thunk";

const initialState = {
    listReview: [],
    selectedReview: null,
    isLoading: false,
    isError: false,
};

const reviewSlice = createSlice({
    name: "review",
    initialState,
    reducers: {
        clearSelectedReviewId: (state) => {
            state.selectedReview = null;
        },
    },
    extraReducers: (builder) => {
        // getAllReviews
        builder
            .addCase(reviewThunk.getAllReviews.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(reviewThunk.getAllReviews.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.listReview = action.payload;
            })
            .addCase(reviewThunk.getAllReviews.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            });

        // getAllReviewsByProductId
        builder
            .addCase(reviewThunk.getAllReviewsByProductId.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(reviewThunk.getAllReviewsByProductId.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.listReview = action.payload;
            })
            .addCase(reviewThunk.getAllReviewsByProductId.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            });

        // getReviewById
        builder
            .addCase(reviewThunk.getReviewById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(reviewThunk.getReviewById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                if (action.payload && action.payload.id) {
                    state.selectedReview = action.payload;
                } else {
                    console.error('Invalid payload received in getReviewById.fulfilled');
                }
            })
            .addCase(reviewThunk.getReviewById.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
                state.selectedReview = null;
            });

        // createReview
        builder
            .addCase(reviewThunk.createReview.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(reviewThunk.createReview.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.listReview.push(action.payload);
            })
            .addCase(reviewThunk.createReview.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            });

        // updateReview
        builder
            .addCase(reviewThunk.updateReview.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(reviewThunk.updateReview.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                const index = state.listReview.findIndex(review => review.id === action.payload.id);
                if (index !== -1) {
                    state.listReview[index] = action.payload;
                }
            })
            .addCase(reviewThunk.updateReview.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            });

        // deleteReview
        builder
            .addCase(reviewThunk.deleteReview.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(reviewThunk.deleteReview.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.listReview = state.listReview.filter(review => review.id !== action.payload);
                if (state.selectedReview === action.payload) {
                    state.selectedReview = null;
                }
            })
            .addCase(reviewThunk.deleteReview.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            });
    },
});

export const { clearSelectedReviewId } = reviewSlice.actions;
export default reviewSlice.reducer;