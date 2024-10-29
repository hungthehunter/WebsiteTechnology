import shopAPI from "../axios/configAxios";

const MANUFACTURER_ENDPOINTS = {
    GET_ALL_MANUFACTURERS: "/manufacturers",
    GET_MANUFACTURER_BY_ID: "/manufacturers/:id",
    CREATE_MANUFACTURER: "/manufacturers",
    UPDATE_MANUFACTURER: "/manufacturers/:id",
    DELETE_MANUFACTURER: "/manufacturers/:id",
}

const manufacturerApi = {
    getAllManufacturers: async (loadingScreen = true) => {
        const res = await shopAPI.get(MANUFACTURER_ENDPOINTS.GET_ALL_MANUFACTURERS);
        if (loadingScreen) {
            await new Promise((state) => setTimeout(state, 2000));
        }
        return res;
    },
    getManufacturerById: async (id, loadingScreen = true) => {
        const res = await shopAPI.get(MANUFACTURER_ENDPOINTS.GET_MANUFACTURER_BY_ID.replace(":id", id));
        if (loadingScreen) {
            await new Promise((state) => setTimeout(state, 2000));
        }
        return res;
    },
    createManufacturer: async (manufacturerData, loadingScreen = true) => {
        const res = await shopAPI.post(MANUFACTURER_ENDPOINTS.CREATE_MANUFACTURER, manufacturerData, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (loadingScreen) {
            await new Promise((state) => setTimeout(state, 2000));
        }
        return res;
    },
    updateManufacturer: async (id, manufacturerData, loadingScreen = true) => {
        const res = await shopAPI.put(MANUFACTURER_ENDPOINTS.UPDATE_MANUFACTURER.replace(":id", id), manufacturerData, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (loadingScreen) {
            await new Promise((state) => setTimeout(state, 2000));
        }
        return res;
    },
    deleteManufacturer: async (id, loadingScreen = true) => {
        const res = await shopAPI.delete(MANUFACTURER_ENDPOINTS.DELETE_MANUFACTURER.replace(":id", id));
        if (loadingScreen) {
            await new Promise((state) => setTimeout(state, 2000));
        }
        return res;
    },
}

export default manufacturerApi;