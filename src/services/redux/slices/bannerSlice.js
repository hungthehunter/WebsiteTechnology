import { createSlice } from "@reduxjs/toolkit";
import { bannerThunk } from "../thunks/thunk";

const initialState = {
    listBanner: [],
    selectedBanner: null,
    isLoading: false,
    isError: false,
};

const bannerSlice = createSlice({
    name: "banner",
    initialState,
    reducers: {
        clearSelectedBannerId: (state) => {
            state.selectedBanner = null;
        },
        updateBanner: (state, action) => {
            const updatedbanner = action.payload;
            const bannerIndex = state.listBanner.findIndex((banner) => banner.id === updatedbanner.id);
            if (bannerIndex !== -1) {
              state.listBanner[bannerIndex] = updatedbanner;
            }
          },
    },
    extraReducers: (builder) => {
        // getAllbanners
        builder
            .addCase(bannerThunk.getAllBanners.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(bannerThunk.getAllBanners.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.listBanner = action.payload;
            })
            .addCase(bannerThunk.getAllBanners.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            });

        // getbannerById
        builder
            .addCase(bannerThunk.getBannerById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(bannerThunk.getBannerById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                if (action.payload && action.payload.id) {
                    state.selectedBanner = action.payload;
                } else {
                    console.error('Invalid payload received in getbannerById.fulfilled');
                }
            })
            .addCase(bannerThunk.getBannerById.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
                state.selectedBanner = null;
            });

        // createbanner
        builder
            .addCase(bannerThunk.createBanner.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(bannerThunk.createBanner.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.listBanner.push(action.payload);
            })
            .addCase(bannerThunk.createBanner.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            });

        // updatebanner
        builder
            .addCase(bannerThunk.updateBanner.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(bannerThunk.updateBanner.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                const index = state.listBanner.findIndex(banner => banner.id === action.payload.id);
                if (index !== -1) {
                    state.listBanner[index] = action.payload;
                }
            })
            .addCase(bannerThunk.updateBanner.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            });

        // deletebanner
        builder
            .addCase(bannerThunk.deleteBanner.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(bannerThunk.deleteBanner.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.listBanner = state.listBanner.filter(banner => banner.id !== action.payload);
                if (state.selectedBanner === action.payload) {
                    state.selectedBanner = null;
                }
            })
            .addCase(bannerThunk.deleteBanner.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            });
    },
});

export const { clearSelectedBannerId , updateBanner } = bannerSlice.actions;
export default bannerSlice.reducer;