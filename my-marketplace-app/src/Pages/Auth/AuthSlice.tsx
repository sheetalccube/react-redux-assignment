import { createSlice } from "@reduxjs/toolkit";

interface User {
  name: string;
  age: number;
  isAdmin?: boolean;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null; //allow null
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { login, logout } = AuthSlice.actions;

export default AuthSlice.reducer;
