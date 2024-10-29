import shopAPI from "../axios/configAxios";

const FUNCTION_ENDPOINTS = {
    GET_ALL_FUNCTIONS: "/functions",
}

const functionApi = {
    getAllFunctions: async (loadingScreen = true) => {
        const res = await shopAPI.get(FUNCTION_ENDPOINTS.GET_ALL_FUNCTIONS);
        if (loadingScreen) {
            await new Promise((state) => setTimeout(state, 2000));
        }
        return res;
    },
}

export default functionApi;