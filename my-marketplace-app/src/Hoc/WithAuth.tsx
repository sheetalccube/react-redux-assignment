import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/Store/Store";

function withAuth<P extends object>(Component: React.ComponentType<P>) {
  function AuthenticatedComponent(props: P) {
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);
    const [countdown, setCountdown] = useState(5);
    const [redirect, setRedirect] = useState(false);

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
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <h2>You must be logged in to access this page.</h2>
        <p>Redirecting to login in {countdown} seconds...</p>
      </div>
    );
  }

  return AuthenticatedComponent;
}

export default withAuth;
