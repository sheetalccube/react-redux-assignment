import { AppBar, Toolbar, IconButton, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/Services/AuthSlice";
import type { RootState } from "@/Store/Store";
import useHeaderStyle from "./HeaderStyle";
import DesktopNav from "./DesktopNav";
import UserBadge from "./UserBadge";
import AuthButtons from "./AuthButtons";
import MobileDrawer from "./MobileDrawer";
import { type THEME_MODE } from "@/Constants/ReusableText";

export interface HeaderProps {
  mode: THEME_MODE;
  onToggleTheme: () => void;
}


export default function Header({ mode, onToggleTheme }: HeaderProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );
  const style = useHeaderStyle();
  const [mobileOpen, setMobileOpen] = useState(false);
  const toggleDrawer = () => setMobileOpen((prev) => !prev);

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/login");
  };

  return (
    <Box>
      <AppBar position="static" color="primary">
        <Toolbar sx={style.toolbar}>
          {/* Mobile menu icon  */}
          <IconButton
            color="inherit"
            edge="start"
            sx={style.mobileMenuButton}
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>

          {/* Desktop navigation */}
          <DesktopNav isAuthenticated={isAuthenticated} user={user} />

          <Box flexGrow={1} />

          {/* Auth + Cart + Theme */}
          <UserBadge
            isAuthenticated={isAuthenticated}
            user={user}
            onToggleTheme={onToggleTheme}
            mode={mode}
            navigate={navigate}
          />
          <AuthButtons
            isAuthenticated={isAuthenticated}
            onLogout={handleLogout}
            navigate={navigate}
          />
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <MobileDrawer
        open={mobileOpen}
        onClose={toggleDrawer}
        isAuthenticated={isAuthenticated}
        isLoggedIn={!!localStorage.getItem("token")}
        onToggleTheme={onToggleTheme}
        mode={mode}
        handleLogout={handleLogout}
      />
    </Box>
  );
}
