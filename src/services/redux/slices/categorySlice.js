import { createSlice } from "@reduxjs/toolkit";
import { categoryThunk } from "../thunks/thunk";

const initialState = {
    listCategory: [],
    selectedCategory: null,
    isLoading: false,
    isError: false,
    shouldReload: false,
};

const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        clearSelectedCategoryId: (state) => {
            state.selectedCategory = null;
        },
        updateCategory: (state, action) => {
            const updatedCategory = action.payload;
            const categoryIndex = state.listCategory.findIndex((category) => category.id === updatedCategory.id);
            if (categoryIndex !== -1) {
              state.listCategory[categoryIndex] = updatedCategory;
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
        // getAllCategories
        builder
            .addCase(categoryThunk.getAllCategories.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(categoryThunk.getAllCategories.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.listCategory = action.payload;
            })
            .addCase(categoryThunk.getAllCategories.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            });

        // getCategoryById
        builder
            .addCase(categoryThunk.getCategoryById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(categoryThunk.getCategoryById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                if (action.payload && action.payload.id) {
                    state.selectedCategory = action.payload;
                } else {
                    console.error('Invalid payload received in getCategoryById.fulfilled');
                }
            })
            .addCase(categoryThunk.getCategoryById.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
                state.selectedCategory = null;
            });

        // createCategory
        builder
            .addCase(categoryThunk.createCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(categoryThunk.createCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.listCategory.push(action.payload);
            })
            .addCase(categoryThunk.createCategory.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            });

        // updateCategory
        builder
            .addCase(categoryThunk.updateCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(categoryThunk.updateCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                const index = state.listCategory.findIndex(category => category.id === action.payload.id);
                if (index !== -1) {
                    state.listCategory[index] = action.payload;
                }
            })
            .addCase(categoryThunk.updateCategory.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            });

        // deleteCategory
        builder
            .addCase(categoryThunk.deleteCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(categoryThunk.deleteCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.listCategory = state.listCategory.filter(category => category.id !== action.payload);
                if (state.selectedCategory === action.payload) {
                    state.selectedCategory = null;
                }
            })
            .addCase(categoryThunk.deleteCategory.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            });
    },
});

export const { clearSelectedCategoryId , updateCategory , resetReload,triggerReload} = categorySlice.actions;
export default categorySlice.reducer;