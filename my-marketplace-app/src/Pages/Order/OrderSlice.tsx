import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CartItem } from "../Cart/CartSlice";

export type Order = {
  id: string;
  items: CartItem[];
  total: number;
  date: string;
};

type OrderState = {
  history: Order[];
};

const initialState: OrderState = {
  history: [],
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<Order>) => {
      state.history.push(action.payload);
    },
  },
});

export const { addOrder } = orderSlice.actions;
export default orderSlice.reducer;
