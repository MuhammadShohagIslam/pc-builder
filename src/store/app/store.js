import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/product/productSlice';
import { baseApi } from "../api/baseApi";

const store = configureStore({
  reducer: {
    product: productReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});


export default store;