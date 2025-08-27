import { AppBar, Toolbar, Button, Box } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import useHeaderStyle from "./HeaderStyle";
import { type ThemeMode } from "@/Constants/ReusableText";

interface HeaderProps {
  mode: ThemeMode;
  onToggleTheme: () => void;
}
function Header({ mode, onToggleTheme }: HeaderProps) {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("token");
  const style = useHeaderStyle();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const navItems = [
    { label: "Home", path: "/", end: true },
    { label: "Todos", path: "/todos" },
  ];

  return (
    <Box>
      <AppBar position="static" color="primary">
        <Toolbar sx={style.toolbar}>
          {navItems.map(({ label, path, end }) => (
            <NavLink
              key={path}
              to={path}
              end={end}
              style={({ isActive }) => style.navLink(isActive)}
            >
              {label}
            </NavLink>
          ))}

          <Box flexGrow={1} />

          <Button
            variant="outlined"
            color="inherit"
            onClick={onToggleTheme}
            sx={{ mr: 2 }}
          >
            {mode === "light" ? "Dark Mode" : "Light Mode"}
          </Button>

          {isLoggedIn ? (
            <Button variant="outlined" color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <>
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
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
