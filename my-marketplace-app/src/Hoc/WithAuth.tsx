import React, {useEffect, useState} from "react";
import {Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import type {RootState} from "@/Store/Store";
import useStyle from "@/Hoc/AuthStyle";
import {Box, Typography} from "@mui/material";
function withAuth<P extends object>(Component: React.ComponentType<P>) {
  function AuthenticatedComponent(props: P) {
    const {isAuthenticated} = useSelector((state: RootState) => state.auth);
    const [countdown, setCountdown] = useState<number>(5);
    const [redirect, setRedirect] = useState<boolean>(false);
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
      <Box sx={style.container}>
        <Typography sx={style.heading}>
          You must be logged in to access this page.
        </Typography>
        <Typography sx={style.message}>
          Redirecting to login in {countdown} seconds...
        </Typography>
      </Box>
    );
  }

  return AuthenticatedComponent;
}

export default withAuth;
