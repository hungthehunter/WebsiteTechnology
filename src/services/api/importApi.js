import shopAPI from "../axios/configAxios";

const IMPORT_ENDPOINTS = {
  GET_ALL_IMPORT: "/imports",
  GET_IMPORT_BY_ID: "/imports/:id",
  CREATE_IMPORT: "/imports",
  UPDATE_IMPORT: "/imports/:id",
};

const importApi = {
  getAllImport: async (loadingScreen = true) => {
    const res = await shopAPI.get(IMPORT_ENDPOINTS.GET_ALL_IMPORT);
    if (loadingScreen) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
    return res;
  },

  getImportById: async (id, loadingScreen = true) => {
    try {
      const res = await shopAPI.get(
        IMPORT_ENDPOINTS.GET_IMPORT_BY_ID.replace(":id", id)
      );
      if (loadingScreen) {
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
      if (res && res.id) {
        return res;
      } else {
        throw new Error("Invalid IMPORT data received");
      }
    } catch (error) {
      console.error("Error fetching IMPORT by ID:", error);
      throw error;
    }
  },

  createImport: async (importData) => {
    const res = await shopAPI.post(
      IMPORT_ENDPOINTS.CREATE_IMPORT,
      importData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return res;
  },

  updateImport: async (id, formData) => {
    const res = await shopAPI.put(
      IMPORT_ENDPOINTS.UPDATE_IMPORT.replace(":id", id),
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

export default importApi;
