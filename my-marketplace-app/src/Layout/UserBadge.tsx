import { Button, IconButton, Tooltip } from "@mui/material";
import { useSelector } from "react-redux";
import type { RootState } from "@/Store/Store";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Badge } from "@mui/material";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PersonIcon from "@mui/icons-material/Person";
import type { UserBadgeProps } from "@/Types/CommonTypes";

export default function UserBadge({
  isAuthenticated,
  user,
  onToggleTheme,
  mode,
  navigate,
}: UserBadgeProps) {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      <Button
        variant="outlined"
        color="inherit"
        onClick={onToggleTheme}
        sx={{ mr: 2, display: { xs: "none", md: "inline-flex" } }}
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
          <IconButton color="inherit" sx={{ mr: 2 }}>
            {user.isAdmin ? <AdminPanelSettingsIcon /> : <PersonIcon />}
          </IconButton>
        </Tooltip>
      )}
    </>
  );
}
