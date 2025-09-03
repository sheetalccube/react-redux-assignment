import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "./Layout/Header";
import type { AppProps } from "./Types/commonTypes";

export default function App({ mode, onToggleTheme }: AppProps) {
  return (
    <>
      <Header mode={mode} onToggleTheme={onToggleTheme} />
      <Box sx={{ p: 2 }}>
        <Outlet />
      </Box>
    </>
  );
}
