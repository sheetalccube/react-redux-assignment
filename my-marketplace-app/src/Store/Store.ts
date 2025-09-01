import { configureStore } from "@reduxjs/toolkit";
import { productApi } from "../Api/ProductApi";
import AuthSlice from "../Pages/Auth/AuthSlice";
import cartReducer from "../Pages/Cart/CartSlice";
import orderReducer from "../Pages/Order/OrderSlice";
export const store = configureStore({
  reducer: {
    auth: AuthSlice,
    cart: cartReducer,
    order: orderReducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
