import shopAPI from "../axios/configAxios";

const ACCESS_ENDPOINTS = {
    GET_ALL_ACCESS: "/accesses",
    GET_ACCESS_BY_ID: "/accesses/:id",
    CREATE_ACCESS: "/accesses",
    UPDATE_ACCESS: "/accesses/:id",
    DELETE_ACCESS: "/accesses/:id",
}

const accessApi = {
    getAllAccess: async (loadingScreen = true) => {
        const res = await shopAPI.get(ACCESS_ENDPOINTS.GET_ALL_ACCESS);
        if (loadingScreen) {
            await new Promise((state) => setTimeout(state, 2000));
        }
        return res;
    },
    getAccessById: async (id, loadingScreen = true) => {
        const res = await shopAPI.get(ACCESS_ENDPOINTS.GET_ACCESS_BY_ID.replace(":id", id));
        if (loadingScreen) {
            await new Promise((state) => setTimeout(state, 2000));
        }
        return res;
    },
    createAccess: async (accessData, loadingScreen = true) => {
        const res = await shopAPI.post(ACCESS_ENDPOINTS.CREATE_ACCESS, accessData, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (loadingScreen) {
            await new Promise((state) => setTimeout(state, 2000));
        }
        return res;
    },
    updateAccess: async (id, accessData, loadingScreen = true) => {
        const res = await shopAPI.put(ACCESS_ENDPOINTS.UPDATE_ACCESS.replace(":id", id), accessData, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (loadingScreen) {
            await new Promise((state) => setTimeout(state, 2000));
        }
        return res;
    },
    deleteAccess: async (id, loadingScreen = true) => {
        const res = await shopAPI.delete(ACCESS_ENDPOINTS.DELETE_ACCESS.replace(":id", id));
        if (loadingScreen) {
            await new Promise((state) => setTimeout(state, 2000));
        }
        return res;
    },
}

export default accessApi;