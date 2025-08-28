import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import App from "./App";
import { type ThemeMode, THEME } from "./Constants/ReusableText";
import { getTheme } from "./Styles/Theme";
import Home from "./Pages/Home/Home";
import { Provider } from "react-redux";

const LoginPage = React.lazy(() => import("./Pages/Auth/LoginPage"));
const SignupPage = React.lazy(() => import("./Pages/Auth/Signup"));
const Todos = React.lazy(() => import("./Pages/Todo/Todos"));
const ProductList = React.lazy(() => import("./Pages/Product/ProductList"));
const ProductForm = React.lazy(() => import("./Pages/Product/ProductForm"));

import withPublic from "./Hoc/WithPublic";
import withAuth from "./Hoc/WithAuth";
import { store } from "./Store/Store";

function MainApp() {
  const [mode, setMode] = useState<ThemeMode>(THEME.Light);
  const toggleTheme = () =>
    setMode(mode === THEME.Light ? THEME.Dark : THEME.Light);

  const PublicLogin = withPublic(LoginPage);
  const PublicSignup = withPublic(SignupPage);
  const ProtectedTodos = withAuth(Todos);

  return (
    <ThemeProvider theme={getTheme(mode)}>
      <CssBaseline />
      <BrowserRouter>
        <Box sx={{ p: 2 }}>
          <React.Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route
                path="/"
                element={<App mode={mode} onToggleTheme={toggleTheme} />}
              >
                <Route index element={<Navigate to="/home" replace />} />
                <Route path="home" element={<Home />} />
                <Route path="login" element={<PublicLogin />} />
                <Route path="signup" element={<PublicSignup />} />
                <Route path="todos" element={<ProtectedTodos />} />
                <Route path="/products" element={<ProductList />} />
                <Route path="/products/:id/edit" element={<ProductForm />} />
                <Route path="/products/new" element={<ProductForm />} />

                <Route path="*" element={<div>404 - Page Not Found</div>} />
              </Route>
            </Routes>
          </React.Suspense>
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <MainApp />
  </Provider>
);
export default MainApp;
