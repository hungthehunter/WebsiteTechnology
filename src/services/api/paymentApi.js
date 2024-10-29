import shopAPI from "../axios/configAxios";

const PAYMENT_ENDPOINTS = {
    GET_ALL_PAYMENTS: "/payments",
    GET_PAYMENT_BY_ID: "/payments/:id",
    CREATE_PAYMENT: "/payments",
    UPDATE_PAYMENT: "/payments/:id",
    DELETE_PAYMENT: "/payments/:id",
}

const paymentApi = {
    getAllPayments: async (loadingScreen = true) => {
        const res = await shopAPI.get(PAYMENT_ENDPOINTS.GET_ALL_PAYMENTS);
        if (loadingScreen) {
            await new Promise((state) => setTimeout(state, 2000));
        }
        return res;
    },
    getPaymentById: async (id, loadingScreen = true) => {
        const res = await shopAPI.get(PAYMENT_ENDPOINTS.GET_PAYMENT_BY_ID.replace(":id", id));
        if (loadingScreen) {
            await new Promise((state) => setTimeout(state, 2000));
        }
        return res;
    },
    createPayment: async (paymentData, loadingScreen = true) => {
        const res = await shopAPI.post(PAYMENT_ENDPOINTS.CREATE_PAYMENT, paymentData, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (loadingScreen) {
            await new Promise((state) => setTimeout(state, 2000));
        }
        return res;
    },
    updatePayment: async (id, paymentData, loadingScreen = true) => {
        const res = await shopAPI.put(PAYMENT_ENDPOINTS.UPDATE_PAYMENT.replace(":id", id), paymentData, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (loadingScreen) {
            await new Promise((state) => setTimeout(state, 2000));
        }
        return res;
    },
    deletePayment: async (id, loadingScreen = true) => {
        const res = await shopAPI.delete(PAYMENT_ENDPOINTS.DELETE_PAYMENT.replace(":id", id));
        if (loadingScreen) {
            await new Promise((state) => setTimeout(state, 2000));
        }
        return res;
    },
}

export default paymentApi;