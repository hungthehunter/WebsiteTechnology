import { createAsyncThunk } from "@reduxjs/toolkit";
import accessApi from "../../api/accessApi.js";
import addressApi from "../../api/addressApi.js";
import bannerApi from "../../api/bannerApi.js";
import cartApi from "../../api/cartApi.js";
import categoryApi from "../../api/categoryApi.js";
import decentralizationApi from "../../api/decentralizationApi.js";
import exportApi from "../../api/exportApi.js";
import functionApi from "../../api/functionApi.js";
import importApi from "../../api/importApi.js";
import invoiceApi from "../../api/invoiceApi.js";
import manufacturerApi from "../../api/manufacturerApi.js";
import orderApi from "../../api/orderApi.js";
import paymentApi from "../../api/paymentApi.js";
import productApi from "../../api/productApi.js";
import promotionApi from "../../api/promotionApi.js";
import purchaseHistoryApi from "../../api/purchasehistoryApi.js";
import reviewApi from "../../api/reviewApi.js";
import summaryApi from "../../api/summaryApi.js";
import userApi from "../../api/userApi.js";

export const accessThunk = {
  getAllAccess: createAsyncThunk(
    "access/getAllAccess",
    async (_, { rejectWithValue }) => {
      try {
        const res = await accessApi.getAllAccess();
        return res;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  ),
  getAccessById: createAsyncThunk(
    "access/getAccessById",
    async (id, { rejectWithValue }) => {
      try {
        const res = await accessApi.getAccessById(id);
        return res;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  ),
  createAccess: createAsyncThunk(
    "access/createAccess",
    async (accessData, { rejectWithValue }) => {
      try {
        const res = await accessApi.createAccess(accessData);
        return res;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  ),
  updateAccess: createAsyncThunk(
    "access/updateAccess",
    async ({ id, accessData }, { rejectWithValue }) => {
      try {
        const res = await accessApi.updateAccess(id, accessData);
        return res;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  ),
  deleteAccess: createAsyncThunk(
    "access/deleteAccess",
    async (id, { rejectWithValue }) => {
      try {
        await accessApi.deleteAccess(id);
        return id;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  ),
};

export const addressThunk = {
  getAllAddresses: createAsyncThunk(
    "address/getAllAddresses",
    async (_, { rejectWithValue }) => {
      try {
        const res = await addressApi.getAllAddresses();
        return res;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  ),
  getAddressById: createAsyncThunk(
    "address/getAddressById",
    async (id, { rejectWithValue }) => {
      try {
        const res = await addressApi.getAddressById(id);
        return res;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  ),
  createAddress: createAsyncThunk(
    "address/createAddress",
    async (addressData, { rejectWithValue }) => {
      try {
        const res = await addressApi.createAddress(addressData);
        return res;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  ),
  updateAddress: createAsyncThunk(
    "address/updateAddress",
    async ({ id, addressData }, { rejectWithValue }) => {
      try {
        const res = await addressApi.updateAddress(id, addressData);
        return res;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  ),
  deleteAddress: createAsyncThunk(
    "address/deleteAddress",
    async (id, { rejectWithValue }) => {
      try {
        await addressApi.deleteAddress(id);
        return id;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  ),
};

export const cartThunk = {
  getAllCartItems: createAsyncThunk(
    "cart/getAllCartItems",
    async (_, { rejectWithValue }) => {
      try {
        const res = await cartApi.getAllCartItems();
        return res;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  ),
  getCartItemById: createAsyncThunk(
    "cart/getCartItemById",
    async (id, { rejectWithValue }) => {
      try {
        const res = await cartApi.getCartItemById(id);
        return res;
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  ),
  getUserCart: createAsyncThunk(
    "cart/getUserCart",
    async (id, { rejectWithValue }) => {
      try {
        const response = await cartApi.getUserCart(id);
        if (!response) {
          throw new Error("No data returned");
        }
        return response;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  ),
  addToCart: createAsyncThunk(
    "cart/addToCart",
    async (cartData, { rejectWithValue }) => {
      try {
        const res = await cartApi.addToCart(cartData);
        return res;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  ),
  updateCartItem: createAsyncThunk(
    "cart/updateCartItem",
    async ({ id, cartData }, { rejectWithValue }) => {
      try {
        const res = await cartApi.updateCartItem(id, cartData);
        return res;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  ),
  removeFromCart: createAsyncThunk(
    "cart/removeFromCart",
    async (id, { rejectWithValue }) => {
      try {
        await cartApi.removeFromCart(id);
        return id;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  ),
};

export const categoryThunk = {
  getAllCategories: createAsyncThunk(
    "category/getAllCategories",
    async (_, { rejectWithValue }) => {
      try {
        const res = await categoryApi.getAllCategories();
        return res;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  ),
  getCategoryById: createAsyncThunk(
    "category/getCategoryById",
    async (id, { rejectWithValue }) => {
      try {
        const res = await categoryApi.getCategoryById(id);
        return res;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  ),
  createCategory: createAsyncThunk(
    "category/createCategory",
    async (categoryData, { rejectWithValue }) => {
      try {
        const res = await categoryApi.createCategory(categoryData);
        return res;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  ),
  updateCategory: createAsyncThunk(
    "category/updateCategory",
    async ({ id, categoryData }, { rejectWithValue }) => {
      try {
        const res = await categoryApi.updateCategory(id, categoryData);
        return res;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  ),
  deleteCategory: createAsyncThunk(
    "category/deleteCategory",
    async (id, { rejectWithValue }) => {
      try {
        await categoryApi.deleteCategory(id);
        return id;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  ),
};

export const decentralizationThunk = {
  getAllDecentralization: createAsyncThunk(
    "decentralization/getAllDecentralizations",
    async (_, { rejectWithValue }) => {
      try {
        const res = await decentralizationApi.getAllDecentralization();
        return res;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  ),
  getDecentralizationById: createAsyncThunk(
    "decentralization/getDecentralizationById",
    async (id, { rejectWithValue }) => {
      try {
        const res = await decentralizationApi.getDecentralizationById(id);
        return res;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  ),
  createDecentralization: createAsyncThunk(
    "decentralization/createDecentralization",
    async (data, { rejectWithValue }) => {
      try {
        const res = await decentralizationApi.createDecentralization(data);
        return res;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  ),
  updateDecentralization: createAsyncThunk(
    "decentralization/updateDecentralization",
    async ({ id, decentralizationData }, { rejectWithValue }) => {
      try {
        const res = await decentralizationApi.updateDecentralization(
          id,
          decentralizationData
        );
        return res;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  ),
  deleteDecentralization: createAsyncThunk(
    "decentralization/deleteDecentralization",
    async (id, { rejectWithValue }) => {
      try {
        await decentralizationApi.deleteDecentralization(id);
        return id;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  ),
};

export const functionThunk = {
  getAllFunctions: createAsyncThunk(
    "function/getAllFunctions",
    async (_, { rejectWithValue }) => {
      try {
        const res = await functionApi.getAllFunctions();
        return res;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  ),
};

export const invoiceThunk = {
  getAllInvoices: createAsyncThunk(
    "invoice/getAllInvoices",
    async (_, { rejectWithValue }) => {
      try {
        const res = await invoiceApi.getAllInvoices();
        return res;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  ),
  getInvoiceById: createAsyncThunk(
    "invoice/getInvoiceById",
    async (id, { rejectWithValue }) => {
      try {
        const res = await invoiceApi.getInvoiceById(id);
        return res;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  ),
  createInvoice: createAsyncThunk(
    "invoice/createInvoice",
    async (invoiceData, { rejectWithValue }) => {
      try {
        const res = await invoiceApi.createInvoice(invoiceData);
        return res;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  ),
  updateInvoice: createAsyncThunk(
    "invoice/updateInvoice",
    async ({ id, invoiceData }, { rejectWithValue }) => {
      try {
        const res = await invoiceApi.updateInvoice(id, invoiceData);
        return res;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  ),
  deleteInvoice: createAsyncThunk(
    "invoice/deleteInvoice",
    async (id, { rejectWithValue }) => {
      try {
        const res = await invoiceApi.deleteInvoice(id);
        return id;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  ),
};

export const manufacturerThunk = {
  getAllManufacturers: createAsyncThunk(
    "manufacturer/getAllManufacturers",
    async (_, { rejectWithValue }) => {
      try {
        const res = await manufacturerApi.getAllManufacturers();
        return res;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  ),
  getManufacturerById: createAsyncThunk(
    "manufacturer/getManufacturerById",
    async (id, { rejectWithValue }) => {
      try {
        const res = await manufacturerApi.getManufacturerById(id);
        return res;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  ),
  createManufacturer: createAsyncThunk(
    "manufacturer/createManufacturer",
    async (manufacturerData, { rejectWithValue }) => {
      try {
        const res = await manufacturerApi.createManufacturer(manufacturerData);
        return res;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  ),
  updateManufacturer: createAsyncThunk(
    "manufacturer/updateManufacturer",
    async ({ id, manufacturerData }, { rejectWithValue }) => {
      try {
        const res = await manufacturerApi.updateManufacturer(
          id,
          manufacturerData
        );
        return res;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  ),
  deleteManufacturer: createAsyncThunk(
    "manufacturer/deleteManufacturer",
    async (id, { rejectWithValue }) => {
      try {
        await manufacturerApi.deleteManufacturer(id);
        return id;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  ),
};

export const orderThunk = {
  getAllOrders: createAsyncThunk(
    "order/getAllOrders",
    async (_, { rejectWithValue }) => {
      try {
        const res = await orderApi.getAllOrder();
        return res;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  ),
  getOrderById: createAsyncThunk(
    "order/getOrderById",
    async (id, { rejectWithValue }) => {
      try {
        const res = await orderApi.getOrderById(id);
        return res;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  ),
  createOrder: createAsyncThunk(
    "order/createOrder",
    async (formData, { rejectWithValue }) => {
      try {
        const res = await orderApi.createOrder(formData);
        return res;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  ),
  updateOrder: createAsyncThunk(
    "order/updateOrder",
    async ({ id, orderData }, { rejectWithValue }) => {
      try {
        const res = await orderApi.updateOrder(id, orderData);
        return res;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  ),
  deleteOrder: createAsyncThunk(
    "order/deleteOrder",
    async (id, { rejectWithValue }) => {
      try {
        await orderApi.deleteOrder(id);
        return id;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  ),
};

export const paymentThunk = {
  getAllPayments: createAsyncThunk(
    "payment/getAllPayments",
    async (_, { rejectWithValue }) => {
      try {
        const res = await paymentApi.getAllPayments();
        return res;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  ),
  getPaymentById: createAsyncThunk(
    "payment/getPaymentById",
    async (id, { rejectWithValue }) => {
      try {
        const res = await paymentApi.getPaymentById(id);
        return res;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  ),
  createPayment: createAsyncThunk(
    "payment/createPayment",
    async (paymentData, { rejectWithValue }) => {
      try {
        const res = await paymentApi.createPayment(paymentData);
        return res;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  ),
  updatePayment: createAsyncThunk(
    "payment/updatePayment",
    async ({ id, paymentData }, { rejectWithValue }) => {
      try {
        const res = await paymentApi.updatePayment(id, paymentData);
        return res;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  ),
  deletePayment: createAsyncThunk(
    "payment/deletePayment",
    async (id, { rejectWithValue }) => {
      try {
        await paymentApi.deletePayment(id);
        return id;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  ),
};

export const productThunk = {
  getAllProduct: createAsyncThunk(
    "product/getAllProduct",
    async (_, { rejectWithValue }) => {
      try {
        const res = await productApi.getAllProduct();
        return res;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  ),
  getAllProductByManufacturerId: createAsyncThunk(
    "product/getAllByManufacturerId",
    async (id, { rejectWithValue }) => {
      try {
        const res = await productApi.getAllProductByManufacturerId(id);
        return res;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  ),
  getProductById: createAsyncThunk(
    "product/getProductById",
    async (id, { rejectWithValue }) => {
      try {
        const res = await productApi.getProductById(id);
        return res;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  ),
  createProduct: createAsyncThunk(
    "product/createProduct",
    async (productData, { rejectWithValue }) => {
      try {
        const res = await productApi.createProduct(productData);
        return res;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  ),
  updateProduct: createAsyncThunk(
    "product/updateProduct",
    async ({ id, productData }, { rejectWithValue }) => {
      try {
        const res = await productApi.updateProduct(id, productData);
        return res;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  ),
  deleteProduct: createAsyncThunk(
    "product/deleteProduct",
    async (id, { rejectWithValue }) => {
      try {
        await productApi.deleteProduct(id);
        return id;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  ),
};

export const promotionThunk = {
  getAllPromotions: createAsyncThunk(
    "promotion/getAllPromotions",
    async (_, { rejectWithValue }) => {
      try {
        const res = await promotionApi.getAllPromotions();
        return res;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  ),
  getPromotionById: createAsyncThunk(
    "promotion/getPromotionById",
    async (id, { rejectWithValue }) => {
      try {
        const res = await promotionApi.getPromotionById(id);
        return res;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  ),
  createPromotion: createAsyncThunk(
    "promotion/createPromotion",
    async (promotionData, { rejectWithValue }) => {
      try {
        const res = await promotionApi.createPromotion(promotionData);
        return res;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  ),
  updatePromotion: createAsyncThunk(
    "promotion/updatePromotion",
    async ({ id, promotionData }, { rejectWithValue }) => {
      try {
        const res = await promotionApi.updatePromotion(id, promotionData);
        return res;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  ),
  deletePromotion: createAsyncThunk(
    "promotion/deletePromotion",
    async (id, { rejectWithValue }) => {
      try {
        await promotionApi.deletePromotion(id);
        return id;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  ),
};

export const purchaseHistoryThunk = {
  getAllPurchaseHistories: createAsyncThunk(
    "purchaseHistory/getAllPurchaseHistories",
    async (_, { rejectWithValue }) => {
      try {
        const res = await purchaseHistoryApi.getAllPurchaseHistories();
        return res;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  ),
  getPurchaseHistoryById: createAsyncThunk(
    "purchaseHistory/getPurchaseHistoryById",
    async (id, { rejectWithValue }) => {
      try {
        const res = await purchaseHistoryApi.getPurchaseHistoryById(id);
        return res;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  ),
  createPurchaseHistory: createAsyncThunk(
    "purchaseHistory/createPurchaseHistory",
    async (data, { rejectWithValue }) => {
      try {
        const res = await purchaseHistoryApi.createPurchaseHistory(data);
        return res;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  ),
  updatePurchaseHistory: createAsyncThunk(
    "purchaseHistory/updatePurchaseHistory",
    async ({ id, data }, { rejectWithValue }) => {
      try {
        const res = await purchaseHistoryApi.updatePurchaseHistory(id, data);
        return res;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  ),
  deletePurchaseHistory: createAsyncThunk(
    "purchaseHistory/deletePurchaseHistory",
    async (id, { rejectWithValue }) => {
      try {
        await purchaseHistoryApi.deletePurchaseHistory(id);
        return id;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  ),
};

export const reviewThunk = {
  getAllReviews: createAsyncThunk(
    "review/getAllReviews",
    async (_, { rejectWithValue }) => {
      try {
        const res = await reviewApi.getAllReview();
        return res;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  ),
  getAllReviewsByProductId: createAsyncThunk(
    "review/getAllReviewsByProductId",
    async (id, { rejectWithValue }) => {
      try {
        const res = await reviewApi.getAllReviewByProductId(id);
        return res;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  ),
  getReviewById: createAsyncThunk(
    "review/getReviewById",
    async (id, { rejectWithValue }) => {
      try {
        const res = await reviewApi.getReviewById(id);
        return res;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  ),
  createReview: createAsyncThunk(
    "review/createReview",
    async (reviewData, { rejectWithValue }) => {
      try {
        const res = await reviewApi.createReview(reviewData);
        return res;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  ),
  updateReview: createAsyncThunk(
    "review/updateReview",
    async ({ id, reviewData }, { rejectWithValue }) => {
      try {
        const res = await reviewApi.updateReview(id, reviewData);
        return res;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  ),
  deleteReview: createAsyncThunk(
    "review/deleteReview",
    async (id, { rejectWithValue }) => {
      try {
        const res = await reviewApi.deleteReview(id);
        return res;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  ),
};

export const summaryThunk = {
  getAllSummary: createAsyncThunk(
    "summary/getAllSummary",
    async (_, { rejectWithValue }) => {
      try {
        const res = await summaryApi.getAllSummary();
        return res;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  )
}

export const bannerThunk = {
  getAllBanners: createAsyncThunk(
    "banner/getAllBanners",
    async (_, { rejectWithValue }) => {
      try {
        const res = await bannerApi.getAllBanner();
        return res;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  ),
  getBannerById: createAsyncThunk(
    "banner/getBannerById",
    async (id, { rejectWithValue }) => {
      try {
        const res = await bannerApi.getBannerById(id);
        return res;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  ),
  createBanner: createAsyncThunk(
    "banner/createBanner",
    async (bannerData, { rejectWithValue }) => {
      try {
        const res = await bannerApi.createBanner(bannerData);
        return res;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  ),
  updateBanner: createAsyncThunk(
    "banner/updateBanner",
    async ({ id, bannerData }, { rejectWithValue }) => {
      try {
        const res = await bannerApi.updateBanner(id, bannerData);
        return res;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  ),
  deleteBanner: createAsyncThunk(
    "banner/deleteBanner",
    async (id, { rejectWithValue }) => {
      try {
        const res = await bannerApi.deleteBanner(id);
        return res;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  ),
};

export const userThunk = {
  getAllUsers: createAsyncThunk(
    "user/getAllUsers",
    async (_, { rejectWithValue }) => {
      try {
        const res = await userApi.getAllUser();
        return res;
      } catch (error) {
        return rejectWithValue(
          error.message
        );
      }
    }
  ),
  getUserById: createAsyncThunk(
    "user/getUserById",
    async (id, { rejectWithValue }) => {
      try {
        const res = await userApi.getUserById(id);
        return res;
      } catch (error) {
        return rejectWithValue(
          error.message
        );
      }
    }
  ),
  createUser: createAsyncThunk(
    "user/createUser",
    async (userData, { rejectWithValue }) => {
      try {
        const res = await userApi.createUser(userData);
        return res;
      } catch (error) {
        return rejectWithValue(
          error.message
        );
      }
    }
  ),
  loginUser: createAsyncThunk(
    "user/loginUser",
    async (userData, { rejectWithValue }) => {
      try {
        const res = await userApi.loginUser(userData);
        return res;
      } catch (error) {
        return rejectWithValue(
          error.message
        );
      }
    }
  ),
  signUpUser: createAsyncThunk(
    "user/signUpUser",
    async (userData, { rejectWithValue }) => {
      try {
        const res = await userApi.signUpUser(userData);
        return res;
      } catch (error) {
        return rejectWithValue(
          error.message
        );
      }
    }
  ),
  updateUser: createAsyncThunk(
    "user/updateUser",
    async ({ id, userData }, { rejectWithValue }) => {
      try {
        const res = await userApi.updateUser(id, userData);
        return res;
      } catch (error) {
        return rejectWithValue(
          error.message
        );
      }
    }
  ),
  updateUserInfo: createAsyncThunk(
    "user/updateUserInfo",
    async ({ id, userData }, { rejectWithValue }) => {
      try {
        const res = await userApi.updateUserInfo(id, userData);
        return res;
      } catch (error) {
        return rejectWithValue(
          error.message
        );
      }
    }
  ),
  deleteUser: createAsyncThunk(
    "user/deleteUser",
    async (id, { rejectWithValue }) => {
      try {
        await userApi.deleteUser(id);
        return id;
      } catch (error) {
        return rejectWithValue(
          error.message
        );
      }
    }
  ),
};

export const importThunk = {
  getAllImports: createAsyncThunk(
    "import/getAllImports",
    async (_, { rejectWithValue }) => {
      try {
        const res = await importApi.getAllImport();
        return res;
      } catch (error) {
        return rejectWithValue(
          error.message
        );
      }
    }
  ),
  getImportById: createAsyncThunk(
    "import/getImportById",
    async (id, { rejectWithValue }) => {
      try {
        const res = await importApi.getImportById(id);
        return res;
      } catch (error) {
        return rejectWithValue(
          error.message
        );
      }
    }
  ),
  createImport: createAsyncThunk(
    "import/createImport",
    async (importData, { rejectWithValue }) => {
      try {
        const res = await importApi.createImport(importData);
        return res;
      } catch (error) {
        return rejectWithValue(
          error.message
        );
      }
    }
  ),
  updateImport: createAsyncThunk(
    "import/updateImport",
    async ({ id, importData }, { rejectWithValue }) => {
      try {
        const res = await importApi.updateImport(id, importData);
        return res;
      } catch (error) {
        return rejectWithValue(
          error.message
        );
      }
    }
  ),
};

export const exportThunk = {
  getAllExports: createAsyncThunk(
    "import/getAllExports",
    async (_, { rejectWithValue }) => {
      try {
        const res = await exportApi.getAllExport();
        return res;
      } catch (error) {
        return rejectWithValue(
          error.message
        );
      }
    }
  ),
  getExportById: createAsyncThunk(
    "import/getExportById",
    async (id, { rejectWithValue }) => {
      try {
        const res = await exportApi.getExportById(id);
        return res;
      } catch (error) {
        return rejectWithValue(
          error.message
        );
      }
    }
  ),
  createExport: createAsyncThunk(
    "import/createExport",
    async (exportData, { rejectWithValue }) => {
      try {
        const res = await exportApi.createExport(exportData);
        return res;
      } catch (error) {
        return rejectWithValue(
          error.message
        );
      }
    }
  ),
  updateExport: createAsyncThunk(
    "import/updateExport",
    async ({ id, exportData }, { rejectWithValue }) => {
      try {
        const res = await exportApi.updateExport(id, exportData);
        return res;
      } catch (error) {
        return rejectWithValue(
          error.message
        );
      }
    }
  ),
};
