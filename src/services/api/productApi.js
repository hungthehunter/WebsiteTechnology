import shopAPI from "../axios/configAxios";

const PRODUCT_ENDPOINTS = {
  GET_ALL_PRODUCT: "/products",
  GET_ALL_PRODUCT_BY_MANUFACTURER_ID: "/products/manufacturer/:id",
  GET_PRODUCT_BY_ID: "/products/:id",
  CREATE_PRODUCT: "/products",
  UPDATE_PRODUCT: "/products/:id",
  DELETE_PRODUCT: "/products/:id",
};

const productApi = {
  getAllProduct: async (loadingScreen = true) => {
    const res = await shopAPI.get(PRODUCT_ENDPOINTS.GET_ALL_PRODUCT);
    if (loadingScreen) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
    return res;
  },

  getAllProductByManufacturerId: async (id, loadingScreen = true) => {
    const res = await shopAPI.get(
      PRODUCT_ENDPOINTS.GET_ALL_PRODUCT_BY_MANUFACTURER_ID.replace(":id", id)
    );

    if (loadingScreen) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }

    return res;
  },

  getProductById: async (id,loadingScreen = true) => {
    try {
      const res = await shopAPI.get(PRODUCT_ENDPOINTS.GET_PRODUCT_BY_ID.replace(":id", id));
      if (loadingScreen) {
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
      if (res && res.id) {
        return res;
      } else {
        throw new Error("Invalid product data received");
      }
    } catch (error) {
      console.error("Error fetching product by ID:", error);
      throw error;
    }
  },

  createProduct: async (productData) => {

    const res = await shopAPI.post(PRODUCT_ENDPOINTS.CREATE_PRODUCT, productData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return res;
  },

  updateProduct: async (id, formData) => {
    const res = await shopAPI.put(PRODUCT_ENDPOINTS.UPDATE_PRODUCT.replace(":id", id), formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return res;
  },

  deleteProduct: async (id) => shopAPI.delete(PRODUCT_ENDPOINTS.DELETE_PRODUCT.replace(":id", id)),
};

export default productApi;