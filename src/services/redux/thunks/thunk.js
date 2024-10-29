import { createAsyncThunk } from "@reduxjs/toolkit";
import accessApi from "../../api/accessApi.js";
import addressApi from "../../api/addressApi.js";
import cartApi from "../../api/cartApi.js";
import categoryApi from "../../api/categoryApi.js";
import decentralizationApi from "../../api/decentralizationApi.js";
import functionApi from "../../api/functionApi.js";
import invoiceApi from "../../api/invoiceApi.js";
import manufacturerApi from "../../api/manufacturerApi.js";
import orderApi from "../../api/orderApi.js";
import paymentApi from "../../api/paymentApi.js";
import productApi from "../../api/productApi.js";
import promotionApi from "../../api/promotionApi.js";
import purchaseHistoryApi from "../../api/purchasehistoryApi.js";
import reviewApi from "../../api/reviewApi.js";
import userApi from "../../api/userApi.js";
export const accessThunk = {
    getAllAccess: createAsyncThunk("access/getAllAccess", async () => {
        const res = await accessApi.getAllAccess();
        return res;
    }),
    getAccessById: createAsyncThunk("access/getAccessById", async (id) => {
        const res = await accessApi.getAccessById(id);
        return res;
    }),
    createAccess: createAsyncThunk("access/createAccess", async (accessData) => {
        const res = await accessApi.createAccess(accessData);
        return res;
    }),
    updateAccess: createAsyncThunk("access/updateAccess", async ({ id, accessData }) => {
        const res = await accessApi.updateAccess(id, accessData);
        return res;
    }),
    deleteAccess: createAsyncThunk("access/deleteAccess", async (id) => {
        const res = await accessApi.deleteAccess(id);
        return res;
    }),
};

export const addressThunk = {
    getAllAddresses: createAsyncThunk("address/getAllAddresses", async () => {
        const res = await addressApi.getAllAddresses();
        return res;
    }),
    getAddressById: createAsyncThunk("address/getAddressById", async (id) => {
        const res = await addressApi.getAddressById(id);
        return res;
    }),
    createAddress: createAsyncThunk("address/createAddress", async (addressData) => {
        const res = await addressApi.createAddress(addressData);
        return res;
    }),
    updateAddress: createAsyncThunk("address/updateAddress", async ({ id, addressData }) => {
        const res = await addressApi.updateAddress(id, addressData);
        return res;
    }),
    deleteAddress: createAsyncThunk("address/deleteAddress", async (id) => {
        const res = await addressApi.deleteAddress(id);
        return res;
    }),
};

export const cartThunk = {
    getAllCartItems: createAsyncThunk("cart/getAllCartItems", async () => {
        const res = await cartApi.getAllCartItems();
        return res;
    }),
    getCartItemById: createAsyncThunk("cart/getCartItemById", async (id) => {
        const res = await cartApi.getCartItemById(id);
        return res;
    }),
    getUserCart: createAsyncThunk(
        "cart/getUserCart",
        async (id, { rejectWithValue }) => {
          try {
            const response = await cartApi.getUserCart(id);
            if (!response) {
              throw new Error("Không có dữ liệu trả về");
            }
            return response; // Trả về dữ liệu cần thiết
          } catch (error) {
            return rejectWithValue(error?.response || error.message);
          }
        }
      ),
      
    addToCart: createAsyncThunk("cart/addToCart", async (cartData) => {
        const res = await cartApi.addToCart(cartData);
        return res;
    }),
    updateCartItem: createAsyncThunk("cart/updateCartItem", async ({ id, cartData }) => {
        const res = await cartApi.updateCartItem(id, cartData);
        return res;
    }),

    removeFromCart: createAsyncThunk("cart/removeFromCart", async (id) => {
        await cartApi.removeFromCart(id);
        return id;
    }),
};

export const categoryThunk = {
    getAllCategories: createAsyncThunk("category/getAllCategories", async () => {
        const res = await categoryApi.getAllCategories();
        return res;
    }),
    getCategoryById: createAsyncThunk("category/getCategoryById", async (id) => {
        const res = await categoryApi.getCategoryById(id);
        return res;
    }),
    createCategory: createAsyncThunk("category/createCategory", async (categoryData) => {
        const res = await categoryApi.createCategory(categoryData);
        return res;
    }),
    updateCategory: createAsyncThunk("category/updateCategory", async ({ id, categoryData }) => {
        const res = await categoryApi.updateCategory(id, categoryData);
        return res;
    }),
    deleteCategory: createAsyncThunk("category/deleteCategory", async (id) => {
        const res = await categoryApi.deleteCategory(id);
        return res;
    }),
};

export const decentralizationThunk = {
    getAllDecentralizations: createAsyncThunk("decentralization/getAllDecentralizations", async () => {
        const res = await decentralizationApi.getAllDecentralizations();
        return res;
    }),
    getDecentralizationById: createAsyncThunk("decentralization/getDecentralizationById", async (id) => {
        const res = await decentralizationApi.getDecentralizationById(id);
        return res;
    }),
    createDecentralization: createAsyncThunk("decentralization/createDecentralization", async (data) => {
        const res = await decentralizationApi.createDecentralization(data);
        return res;
    }),
    updateDecentralization: createAsyncThunk("decentralization/updateDecentralization", async ({ id, data }) => {
        const res = await decentralizationApi.updateDecentralization(id, data);
        return res;
    }),
    deleteDecentralization: createAsyncThunk("decentralization/deleteDecentralization", async (id) => {
        const res = await decentralizationApi.deleteDecentralization(id);
        return res;
    }),
};

export const functionThunk = {
    getAllFunctions: createAsyncThunk("function/getAllFunctions", async () => {
        const res = await functionApi.getAllFunctions();
        return res;
    }),
};

export const invoiceThunk = {
    getAllInvoices: createAsyncThunk("invoice/getAllInvoices", async () => {
        const res = await invoiceApi.getAllInvoices();
        return res;
    }),
    getInvoiceById: createAsyncThunk("invoice/getInvoiceById", async (id) => {
        const res = await invoiceApi.getInvoiceById(id);
        return res;
    }),
    createInvoice: createAsyncThunk("invoice/createInvoice", async (invoiceData) => {
        const res = await invoiceApi.createInvoice(invoiceData);
        return res;
    }),
    updateInvoice: createAsyncThunk("invoice/updateInvoice", async ({ id, invoiceData }) => {
        const res = await invoiceApi.updateInvoice(id, invoiceData);
        return res;
    }),
    deleteInvoice: createAsyncThunk("invoice/deleteInvoice", async (id) => {
        const res = await invoiceApi.deleteInvoice(id);
        return res;
    }),
};

export const manufacturerThunk = {
    getAllManufacturers: createAsyncThunk("manufacturer/getAllManufacturers", async () => {
        const res = await manufacturerApi.getAllManufacturers();
        return res;
    }),
    getManufacturerById: createAsyncThunk("manufacturer/getManufacturerById", async (id) => {
        const res = await manufacturerApi.getManufacturerById(id);
        return res;
    }),
    createManufacturer: createAsyncThunk("manufacturer/createManufacturer", async (manufacturerData) => {
        const res = await manufacturerApi.createManufacturer(manufacturerData);
        return res;
    }),
    updateManufacturer: createAsyncThunk("manufacturer/updateManufacturer", async ({ id, manufacturerData }) => {
        const res = await manufacturerApi.updateManufacturer(id, manufacturerData);
        return res;
    }),
    deleteManufacturer: createAsyncThunk("manufacturer/deleteManufacturer", async (id) => {
        const res = await manufacturerApi.deleteManufacturer(id);
        return res;
    }),
};

export const orderThunk = {
    getAllOrders: createAsyncThunk("order/getAllOrders", async () => {
        const res = await orderApi.getAllOrder();
        return res;
    }),
    getOrderById: createAsyncThunk("order/getOrderById", async (id) => {
        const res = await orderApi.getOrderById(id);
        return res;
    }),
    createOrder: createAsyncThunk("order/createOrder", async (formData) => {
            const res = await orderApi.createOrder(formData)
            return res;
    }),
    updateOrder: createAsyncThunk("order/updateOrder", async ({ id, orderData }) => {
        const res = await orderApi.updateOrder(id, orderData);
        return res;
    }),
    deleteOrder: createAsyncThunk("order/deleteOrder", async (id) => {
        const res = await orderApi.deleteOrder(id);
        return res;
    }),
};

export const paymentThunk = {
    getAllPayments: createAsyncThunk("payment/getAllPayments", async () => {
        const res = await paymentApi.getAllPayments();
        return res;
    }),
    getPaymentById: createAsyncThunk("payment/getPaymentById", async (id) => {
        const res = await paymentApi.getPaymentById(id);
        return res;
    }),
    createPayment: createAsyncThunk("payment/createPayment", async (paymentData) => {
        const res = await paymentApi.createPayment(paymentData);
        return res;
    }),
    updatePayment: createAsyncThunk("payment/updatePayment", async ({ id, paymentData }) => {
        const res = await paymentApi.updatePayment(id, paymentData);
        return res;
    }),
    deletePayment: createAsyncThunk("payment/deletePayment", async (id) => {
        const res = await paymentApi.deletePayment(id);
        return res;
    }),
};

export const productThunk = {
    getAllProduct: createAsyncThunk("product/getAllProduct", async () => {
        const res = await productApi.getAllProduct();
        return res;
    }),
    getProductById: createAsyncThunk("product/getProductById", async (id) => {
        const res = await productApi.getProductById(id);
        return res;
    }),
    createProduct: createAsyncThunk("product/createProduct", async (productData) => {
        const res = await productApi.createProduct(productData);
        return res;
    }),
    updateProduct: createAsyncThunk("product/updateProduct", async ({ id, productData }) => {
        const res = await productApi.updateProduct(id, productData);
        return res;
    }),
    deleteProduct: createAsyncThunk("product/deleteProduct", async (id) => {
        const res = await productApi.deleteProduct(id);
        return res;
    }),
};

export const promotionThunk = {
    getAllPromotions: createAsyncThunk("promotion/getAllPromotions", async () => {
        const res = await promotionApi.getAllPromotions();
        return res;
    }),
    getPromotionById: createAsyncThunk("promotion/getPromotionById", async (id) => {
        const res = await promotionApi.getPromotionById(id);
        return res;
    }),
    createPromotion: createAsyncThunk("promotion/createPromotion", async (promotionData) => {
        const res = await promotionApi.createPromotion(promotionData);
        return res;
    }),
    updatePromotion: createAsyncThunk("promotion/updatePromotion", async ({ id, promotionData }) => {
        const res = await promotionApi.updatePromotion(id, promotionData);
        return res;
    }),
    deletePromotion: createAsyncThunk("promotion/deletePromotion", async (id) => {
        const res = await promotionApi.deletePromotion(id);
        return res;
    }),
};

export const purchaseHistoryThunk = {
    getAllPurchaseHistories: createAsyncThunk("purchaseHistory/getAllPurchaseHistories", async () => {
        const res = await purchaseHistoryApi.getAllPurchaseHistories();
        return res;
    }),
    getPurchaseHistoryById: createAsyncThunk("purchaseHistory/getPurchaseHistoryById", async (id) => {
        const res = await purchaseHistoryApi.getPurchaseHistoryById(id);
        return res;
    }),
    createPurchaseHistory: createAsyncThunk("purchaseHistory/createPurchaseHistory", async (data) => {
        const res = await purchaseHistoryApi.createPurchaseHistory(data);
        return res;
    }),
    updatePurchaseHistory: createAsyncThunk("purchaseHistory/updatePurchaseHistory", async ({ id, data }) => {
        const res = await purchaseHistoryApi.updatePurchaseHistory(id, data);
        return res;
    }),
    deletePurchaseHistory: createAsyncThunk("purchaseHistory/deletePurchaseHistory", async (id) => {
        const res = await purchaseHistoryApi.deletePurchaseHistory(id);
        return res;
    }),
};

export const reviewThunk = {
    getAllReviews: createAsyncThunk("review/getAllReviews", async () => {
        const res = await reviewApi.getAllReviews();
        return res;
    }),
    getReviewById: createAsyncThunk("review/getReviewById", async (id) => {
        const res = await reviewApi.getReviewById(id);
        return res;
    }),
    createReview: createAsyncThunk("review/createReview", async (reviewData) => {
        const res = await reviewApi.createReview(reviewData);
        return res;
    }),
    updateReview: createAsyncThunk("review/updateReview", async ({ id, reviewData }) => {
        const res = await reviewApi.updateReview(id, reviewData);
        return res;
    }),
    deleteReview: createAsyncThunk("review/deleteReview", async (id) => {
        const res = await reviewApi.deleteReview(id);
        return res;
    }),
};

export const userThunk = {
    getAllUsers: createAsyncThunk("user/getAllUsers", async () => {
        const res = await userApi.getAllUser();
        return res;
    }),
    getUserById: createAsyncThunk("user/getUserById", async (id) => {
        const res = await userApi.getUserById(id);
        return res;
    }),
    createUser: createAsyncThunk("user/createUser", async (userData) => {
        const res = await userApi.createUser(userData);
        return res;
    }),
    updateUser: createAsyncThunk("user/updateUser", async ({ id, userData }) => {
        const res = await userApi.updateUser(id, userData);
        return res;
    }),
    deleteUser: createAsyncThunk("user/deleteUser", async (id) => {
        const res = await userApi.deleteUser(id);
        return res;
    }),
};