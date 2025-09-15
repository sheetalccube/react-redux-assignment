import {Box} from "@mui/material";
import {Outlet} from "react-router-dom";
import Header from "@/Layout/Header";
import {type THEME_MODE} from "@/Constants/CoomonText";

export interface AppProps {
  mode: THEME_MODE;
  onToggleTheme: () => void;
}

export default function App({mode, onToggleTheme}: AppProps) {
  return (
    <>
      <Header mode={mode} onToggleTheme={onToggleTheme} />
      <Box sx={{p: 2}}>
        <Outlet />
      </Box>
    </>
  );
}
