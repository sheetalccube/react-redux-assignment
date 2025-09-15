import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
};
export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
}
export interface User {
  name: string;
  age?: number;
  isAdmin?: boolean;
}

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
    },
  },
});

export const { login, logout } = AuthSlice.actions;
export default AuthSlice.reducer;
