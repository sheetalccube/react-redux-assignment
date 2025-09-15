import {configureStore} from "@reduxjs/toolkit";
import {productApi} from "@/Services/ProductApi";
import AuthSlice from "@/Services/AuthSlice";
import cartReducer from "@/Services/CartSlice";
import orderReducer from "@/Services/OrderSlice";
import todosReducer from "@/Services/TodoSlice";

export const store = configureStore({
  reducer: {
    auth: AuthSlice,
    cart: cartReducer,
    order: orderReducer,
    todos: todosReducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
