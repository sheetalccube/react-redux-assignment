import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/Store/Store";
import useStyle from "./AuthStyle";
function withAuth<P extends object>(Component: React.ComponentType<P>) {
  function AuthenticatedComponent(props: P) {
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);
    const [countdown, setCountdown] = useState(5);
    const [redirect, setRedirect] = useState(false);
    const style = useStyle();

    useEffect(() => {
      if (!isAuthenticated) {
        const interval = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(interval);
              setRedirect(true);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
        return () => clearInterval(interval);
      }
    }, [isAuthenticated]);

    if (isAuthenticated) {
      return <Component {...props} />;
    }

    if (redirect) {
      return <Navigate to="/login" />;
    }

    return (
      <div style={style.container}>
        <h2 style={style.heading}>
          You must be logged in to access this page.
        </h2>
        <p style={style.message}>
          Redirecting to login in {countdown} seconds...
        </p>
      </div>
    );
  }

  return AuthenticatedComponent;
}

export default withAuth;
