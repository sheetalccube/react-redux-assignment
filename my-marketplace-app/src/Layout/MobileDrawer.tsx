import { Drawer, Box, Button } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import useHeaderStyle from "./HeaderStyle";
import type { MobileDrawerProps } from "@/Types/CommonTypes";

export default function MobileDrawer({
  open,
  onClose,
  isAuthenticated,
  isLoggedIn,
  onToggleTheme,
  mode,
  handleLogout,
}: MobileDrawerProps) {
  const style = useHeaderStyle();
  const navigate = useNavigate();

  return (
    <Drawer anchor="left" open={open} onClose={onClose} sx={style.mobileDrawer}>
      <Box sx={style.drawerBox} onClick={onClose}>
        <NavLink
          to="/"
          end
          style={({ isActive }) => style.drawerLink(isActive)}
        >
          <Button fullWidth sx={style.drawerButton}>
            Home
          </Button>
        </NavLink>
        <NavLink
          to="/todos"
          style={({ isActive }) => style.drawerLink(isActive)}
        >
          <Button fullWidth sx={style.drawerButton}>
            Todos
          </Button>
        </NavLink>
        <NavLink
          to="/products"
          style={({ isActive }) => style.drawerLink(isActive)}
        >
          <Button fullWidth sx={style.drawerButton}>
            Products
          </Button>
        </NavLink>
        {isAuthenticated && (
          <NavLink
            to="/history"
            style={({ isActive }) => style.drawerLink(isActive)}
          >
            <Button fullWidth sx={style.drawerButton}>
              History
            </Button>
          </NavLink>
        )}

        <Button fullWidth sx={style.drawerButton} onClick={onToggleTheme}>
          {mode === "light" ? "Dark Mode" : "Light Mode"}
        </Button>

        {isLoggedIn ? (
          <Button fullWidth sx={style.drawerButton} onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <>
            <Button
              fullWidth
              sx={style.drawerButton}
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
            <Button
              fullWidth
              sx={style.drawerButton}
              onClick={() => navigate("/signup")}
            >
              Signup
            </Button>
          </>
        )}
      </Box>
    </Drawer>
  );
}
