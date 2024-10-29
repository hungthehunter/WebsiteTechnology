import shopAPI from "../axios/configAxios";

const INVOICE_ENDPOINTS = {
    GET_ALL_INVOICES: "/invoices",
    GET_INVOICE_BY_ID: "/invoices/:id",
    CREATE_INVOICE: "/invoices",
    UPDATE_INVOICE: "/invoices/:id",
    DELETE_INVOICE: "/invoices/:id",
}

const invoiceApi = {
    getAllInvoices: async (loadingScreen = true) => {
        const res = await shopAPI.get(INVOICE_ENDPOINTS.GET_ALL_INVOICES);
        if (loadingScreen) {
            await new Promise((state) => setTimeout(state, 2000));
        }
        return res;
    },
    getInvoiceById: async (id, loadingScreen = true) => {
        const res = await shopAPI.get(INVOICE_ENDPOINTS.GET_INVOICE_BY_ID.replace(":id", id));
        if (loadingScreen) {
            await new Promise((state) => setTimeout(state, 2000));
        }
        return res;
    },
    createInvoice: async (invoiceData, loadingScreen = true) => {
        const res = await shopAPI.post(INVOICE_ENDPOINTS.CREATE_INVOICE, invoiceData, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (loadingScreen) {
            await new Promise((state) => setTimeout(state, 2000));
        }
        return res;
    },
    updateInvoice: async (id, invoiceData, loadingScreen = true) => {
        const res = await shopAPI.put(INVOICE_ENDPOINTS.UPDATE_INVOICE.replace(":id", id), invoiceData, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (loadingScreen) {
            await new Promise((state) => setTimeout(state, 2000));
        }
        return res;
    },
    deleteInvoice: async (id, loadingScreen = true) => {
        const res = await shopAPI.delete(INVOICE_ENDPOINTS.DELETE_INVOICE.replace(":id", id));
        if (loadingScreen) {
            await new Promise((state) => setTimeout(state, 2000));
        }
        return res;
    },
}

export default invoiceApi;