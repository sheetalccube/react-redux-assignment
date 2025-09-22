import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {CartItem} from "@/Services/CartSlice";

export type Order = {
  id: string;
  items: CartItem[];
  total: number;
  date: string;
};

type OrderState = {
  history: Order[];
};

const loadOrdersFromStorage = (): Order[] => {
  try {
    const stored = localStorage.getItem("orderHistory");
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Failed to load orders from localStorage:", error);
    return [];
  }
};

const initialState: OrderState = {
  history: loadOrdersFromStorage(),
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<Order>) => {
      state.history.push(action.payload);
      localStorage.setItem("orderHistory", JSON.stringify(state.history));
    },
    clearHistory: (state) => {
      state.history = [];
      localStorage.removeItem("orderHistory");
    },
  },
});

export const {addOrder, clearHistory} = orderSlice.actions;
export default orderSlice.reducer;
