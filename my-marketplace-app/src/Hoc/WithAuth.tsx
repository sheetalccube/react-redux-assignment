import React from "react";
import { Navigate } from "react-router-dom";

function withAuth<P extends object>(Component: React.ComponentType<P>) {
  function AuthenticatedComponent(props: P) {
    const isAuth = localStorage.getItem("token");
    return isAuth ? <Component {...props} /> : <Navigate to="/login" />;
  }

  return AuthenticatedComponent;
}

export default withAuth;
