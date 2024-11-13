import shopAPI from "../axios/configAxios";

const EXPORT_ENDPOINTS = {
  GET_ALL_EXPORT: "/exports",
  GET_EXPORT_BY_ID: "/exports/:id",
  CREATE_EXPORT: "/exports",
  UPDATE_EXPORT: "/exports/:id",
};

const exportApi = {
  getAllExport: async (loadingScreen = true) => {
    const res = await shopAPI.get(EXPORT_ENDPOINTS.GET_ALL_EXPORT);
    if (loadingScreen) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
    return res;
  },

  getExportById: async (id, loadingScreen = true) => {
    try {
      const res = await shopAPI.get(
        EXPORT_ENDPOINTS.GET_EXPORT_BY_ID.replace(":id", id)
      );
      if (loadingScreen) {
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
      if (res && res.id) {
        return res;
      } else {
        throw new Error("Invalid EXPORT data received");
      }
    } catch (error) {
      console.error("Error fetching EXPORT by ID:", error);
      throw error;
    }
  },

  createExport: async (exportData) => {
    const res = await shopAPI.post(
      EXPORT_ENDPOINTS.CREATE_EXPORT,
      exportData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return res;
  },

  updateExport: async (id, formData) => {
    const res = await shopAPI.put(
      EXPORT_ENDPOINTS.UPDATE_EXPORT.replace(":id", id),
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return res;
  },
};

export default exportApi;