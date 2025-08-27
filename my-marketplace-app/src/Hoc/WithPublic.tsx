import React from "react";
import { Navigate } from "react-router-dom";

function withPublic<P extends object>(Component: React.ComponentType<P>) {
  return function WithPublicWrapper(props: P) {
    const isAuth = localStorage.getItem("token");
    return isAuth ? <Navigate to="/todos" /> : <Component {...props} />;
  };
}

export default withPublic;
