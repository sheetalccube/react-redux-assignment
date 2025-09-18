import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}
export interface User {
  name: string;
  age?: number;
  isAdmin?: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{user: User}>) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem("auth");
    },
  },
});

export const {login, logout} = AuthSlice.actions;
export default AuthSlice.reducer;
