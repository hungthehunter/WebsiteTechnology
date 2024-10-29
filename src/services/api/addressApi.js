import shopAPI from "../axios/configAxios";

const ADDRESS_ENDPOINTS = {
    GET_ALL_ADDRESSES: "/addresses",
    GET_ADDRESS_BY_ID: "/addresses/:id",
    CREATE_ADDRESS: "/addresses",
    UPDATE_ADDRESS: "/addresses/:id",
    DELETE_ADDRESS: "/addresses/:id",
}

const addressApi = {
    getAllAddresses: async (loadingScreen = true) => {
        const res = await shopAPI.get(ADDRESS_ENDPOINTS.GET_ALL_ADDRESSES);
        if (loadingScreen) {
            await new Promise((state) => setTimeout(state, 2000));
        }
        return res;
    },
    getAddressById: async (id, loadingScreen = true) => {
        const res = await shopAPI.get(ADDRESS_ENDPOINTS.GET_ADDRESS_BY_ID.replace(":id", id));
        if (loadingScreen) {
            await new Promise((state) => setTimeout(state, 2000));
        }
        return res;
    },
    createAddress: async (addressData, loadingScreen = true) => {
        const res = await shopAPI.post(ADDRESS_ENDPOINTS.CREATE_ADDRESS, addressData, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (loadingScreen) {
            await new Promise((state) => setTimeout(state, 2000));
        }
        return res;
    },
    updateAddress: async (id, addressData, loadingScreen = true) => {
        const res = await shopAPI.put(ADDRESS_ENDPOINTS.UPDATE_ADDRESS.replace(":id", id), addressData, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (loadingScreen) {
            await new Promise((state) => setTimeout(state, 2000));
        }
        return res;
    },
    deleteAddress: async (id, loadingScreen = true) => {
        const res = await shopAPI.delete(ADDRESS_ENDPOINTS.DELETE_ADDRESS.replace(":id", id));
        if (loadingScreen) {
            await new Promise((state) => setTimeout(state, 2000));
        }
        return res;
    },
}

export default addressApi;