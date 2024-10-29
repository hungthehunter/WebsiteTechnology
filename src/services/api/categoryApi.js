import shopAPI from "../axios/configAxios";

const CATEGORY_ENDPOINTS = {
    GET_ALL_CATEGORIES: "/categories",
    GET_CATEGORY_BY_ID: "/categories/:id",
    CREATE_CATEGORY: "/categories",
    UPDATE_CATEGORY: "/categories/:id",
    DELETE_CATEGORY: "/categories/:id",
}

const categoryApi = {
    getAllCategories: async (loadingScreen = true) => {
        const res = await shopAPI.get(CATEGORY_ENDPOINTS.GET_ALL_CATEGORIES);
        if (loadingScreen) {
            await new Promise((state) => setTimeout(state, 2000));
        }
        return res;
    },
    getCategoryById: async (id, loadingScreen = true) => {
        const res = await shopAPI.get(CATEGORY_ENDPOINTS.GET_CATEGORY_BY_ID.replace(":id", id));
        if (loadingScreen) {
            await new Promise((state) => setTimeout(state, 2000));
        }
        return res;
    },
    createCategory: async (categoryData, loadingScreen = true) => {
        const res = await shopAPI.post(CATEGORY_ENDPOINTS.CREATE_CATEGORY, categoryData, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (loadingScreen) {
            await new Promise((state) => setTimeout(state, 2000));
        }
        return res;
    },
    updateCategory: async (id, categoryData, loadingScreen = true) => {
        const res = await shopAPI.put(CATEGORY_ENDPOINTS.UPDATE_CATEGORY.replace(":id", id), categoryData, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (loadingScreen) {
            await new Promise((state) => setTimeout(state, 2000));
        }
        return res;
    },
    deleteCategory: async (id, loadingScreen = true) => {
        const res = await shopAPI.delete(CATEGORY_ENDPOINTS.DELETE_CATEGORY.replace(":id", id));
        if (loadingScreen) {
            await new Promise((state) => setTimeout(state, 2000));
        }
        return res;
    },
}

export default categoryApi;