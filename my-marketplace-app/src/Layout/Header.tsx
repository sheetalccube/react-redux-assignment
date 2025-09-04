import {
  AppBar,
  Toolbar,
  Button,
  Box,
  IconButton,
  Drawer,
  Tooltip,
  Badge,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PersonIcon from "@mui/icons-material/Person";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/Services/AuthSlice";
import type { RootState } from "@/Store/Store";
import type { HeaderProps } from "@/Types/CommonTypes";
import useHeaderStyle from "@/Layout/HeaderStyle";

function Header({ mode, onToggleTheme }: HeaderProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const isLoggedIn = localStorage.getItem("token");
  const style = useHeaderStyle();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/login");
  };

  const toggleDrawer = () => setMobileOpen((prev) => !prev);

  return (
    <Box>
      <AppBar position="static" color="primary">
        <Toolbar sx={style.toolbar}>
          <IconButton
            color="inherit"
            edge="start"
            sx={style.mobileMenuIcon}
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>

          <Box sx={style.desktopNav}>
            <NavLink
              to="/products"
              style={({ isActive }) => style.navLink(isActive)}
            >
              Products
            </NavLink>
            <NavLink
              to="/todos"
              style={({ isActive }) => style.navLink(isActive)}
            >
              Todos
            </NavLink>
            <NavLink
              to="/bmi"
              style={({ isActive }) => style.navLink(isActive)}
            >
              BMI Calculator
            </NavLink>
            {isAuthenticated && !user?.isAdmin && (
              <NavLink
                to="/history"
                style={({ isActive }) => style.navLink(isActive)}
              >
                History
              </NavLink>
            )}
          </Box>

          <Box sx={style.flexGrow} />
          <Button
            variant="outlined"
            color="inherit"
            onClick={onToggleTheme}
            sx={style.themeToggleBtn}
          >
            {mode === "light" ? "Dark Mode" : "Light Mode"}
          </Button>

          {isAuthenticated && !user?.isAdmin && (
            <IconButton color="inherit" onClick={() => navigate("/cart")}>
              <Badge badgeContent={cartCount} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          )}

          {isAuthenticated && user && (
            <Tooltip title={user.isAdmin ? "Admin" : "User"}>
              <IconButton color="inherit" sx={style.userIconBtn}>
                {user.isAdmin ? <AdminPanelSettingsIcon /> : <PersonIcon />}
              </IconButton>
            </Tooltip>
          )}

          {isAuthenticated ? (
            <Button
              variant="outlined"
              color="inherit"
              onClick={handleLogout}
              sx={style.logoutBtn}
            >
              Logout
            </Button>
          ) : (
            <Box sx={style.authBox}>
              <Button
                variant="outlined"
                color="inherit"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
              <Button
                variant="outlined"
                color="inherit"
                onClick={() => navigate("/signup")}
              >
                Signup
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={toggleDrawer}
        sx={style.mobileDrawer}
      >
        <Box sx={style.drawerBox} onClick={toggleDrawer}>
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
          <NavLink
            to="/history"
            style={({ isActive }) => style.drawerLink(isActive)}
          >
            <Button fullWidth sx={style.drawerButton}>
              History
            </Button>
          </NavLink>

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
    </Box>
  );
}

export default Header;
