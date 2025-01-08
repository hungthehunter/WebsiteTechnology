import shopAPI from "../axios/configAxios";

const BANNER_ENDPOINTS = {
  GET_ALL_BANNER: "/banners",
  GET_BANNER_BY_ID: "/banners/:id",
  CREATE_BANNER: "/banners",
  UPDATE_BANNER: "/banners/:id",
  DELETE_BANNER: "/banners/:id",
};

const bannerApi = {
  getAllBanner: async (loadingScreen = true) => {
    const res = await shopAPI.get(BANNER_ENDPOINTS.GET_ALL_BANNER);
    if (loadingScreen) {
      await new Promise((state) => setTimeout(state, 2000));
    }
    return res;
  },
  getBannerById: async (id, LoadingScreen = true) => {
    const res = await shopAPI.get(
      BANNER_ENDPOINTS.GET_BANNER_BY_ID.replace(":id", id)
    );
    if (LoadingScreen) {
      await new Promise((state) => setTimeout(state, 2000));
    }
    return res;
  },
  createBanner: async (bannerData, LoadingScreen = true) => {
    const res = await shopAPI.post(BANNER_ENDPOINTS.CREATE_BANNER, bannerData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (LoadingScreen) {
      await new Promise((state) => setTimeout(state, 2000));
    }
    return res;
  },
  updateBanner: async (id, bannerData, LoadingScreen = true) => {
    const res = await shopAPI.put(
      BANNER_ENDPOINTS.UPDATE_BANNER.replace(":id", id),
      bannerData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (LoadingScreen) {
      await new Promise((state) => setTimeout(state, 2000));
    }
    return res;
  },
  deleteBanner: async (id, LoadingScreen) => {
    const res = await shopAPI.delete(
      BANNER_ENDPOINTS.DELETE_BANNER.replace(":id", id)
    );
    if (LoadingScreen) {
      await new Promise((state) => setTimeout(state, 2000));
    }
    return res;
  },
};

export default bannerApi;
