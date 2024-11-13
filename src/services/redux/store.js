// store.js
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import accessReducer from './slices/accessSlice';
import addressReducer from './slices/addressSlice';
import cartReducer from './slices/cartSlice';
import categoryReducer from './slices/categorySlice';
import decentralizationReducer from './slices/decentralizationSlice';
import exportReducer from './slices/exportSlice';
import functionReducer from './slices/functionSlice';
import importReducer from './slices/importSlice';
import invoiceReducer from './slices/invoiceSlice';
import manufacturerReducer from './slices/manufacturerSlice';
import orderReducer from './slices/orderSlice';
import paymentReducer from './slices/paymentSlice';
import productReducer from './slices/productSlice';
import promotionReducer from './slices/promotionSlice';
import purchaseHistoryReducer from './slices/purchaseHistorySlice';
import reviewReducer from './slices/reviewSlice';
import userReducer from './slices/userSlice';
// Kết hợp các reducers lại
const rootReducer = combineReducers({
  product: productReducer,
  access: accessReducer,
  address: addressReducer,
  cart: cartReducer,
  category: categoryReducer,
  decentralization: decentralizationReducer,
  function: functionReducer,
  invoice: invoiceReducer,
  manufacturer: manufacturerReducer,
  order: orderReducer,
  payment: paymentReducer,
  promotion: promotionReducer,
  purchaseHistory: purchaseHistoryReducer,
  review: reviewReducer,
  user: userReducer,
  import: importReducer,
  export: exportReducer
});

// Cấu hình persist
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user','cart','order'], // Các slice cần lưu trữ
};

// Tạo persistedReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Tạo store với persistedReducer
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

// Tạo persistor
const persistor = persistStore(store);

export { persistor, store };

