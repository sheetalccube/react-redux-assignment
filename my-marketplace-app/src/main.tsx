import React, { lazy, useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import App from "./App";
import { type ThemeMode, THEME } from "./Constants/ReusableText";
import { getTheme } from "@/Styles/Theme";
import { Provider } from "react-redux";

const LoginPage = lazy(() => import("@/Pages/Auth/LoginPage"));
const SignupPage = lazy(() => import("@/Pages/Auth/Signup"));
const Todos = lazy(() => import("@/Pages/Todo/Todos"));
const ProductList = lazy(() => import("@/Pages/Product/ProductList"));
const ProductForm = lazy(() => import("@/Pages/Product/ProductForm"));
const CartPage = lazy(() => import("@/Pages/Cart/CartPage"));
const HistoryPage = lazy(() => import("@/Pages/History/HistoryPage"));
const BMICalculatorPage = lazy(() => import("@/Pages/BMI/BMICalculator"));

import withAuth from "@/Hoc/WithAuth";
import { store } from "@/Store/Store";

function MainApp() {
  const [mode, setMode] = useState<ThemeMode>(THEME.Light);
  const toggleTheme = () =>
    setMode(mode === THEME.Light ? THEME.Dark : THEME.Light);

  const ProtectedTodos = withAuth(Todos);
  const ProtectedCart = withAuth(CartPage);

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
                <Route index element={<ProductList />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="signup" element={<SignupPage />} />
                <Route path="todos" element={<ProtectedTodos />} />
                <Route path="/products" element={<ProductList />} />
                <Route path="/products/:id/edit" element={<ProductForm />} />
                <Route path="/products/new" element={<ProductForm />} />
                <Route path="/cart" element={<ProtectedCart />} />
                <Route path="/history" element={<HistoryPage />} />
                <Route path="/bmi" element={<BMICalculatorPage />} />

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
