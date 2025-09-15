import {Box} from "@mui/material";
import {NavLink} from "react-router-dom";
import useHeaderStyle from "@/Layout/HeaderStyle";
import type {User} from "@/Services/AuthSlice";

export interface DesktopNavProps {
  isAuthenticated: boolean;
  user: User | null;
}

export default function DesktopNav({isAuthenticated, user}: DesktopNavProps) {
  const style = useHeaderStyle();

  return (
    <Box sx={style.desktopNav}>
      <NavLink to="/products" style={({isActive}) => style.navLink(isActive)}>
        Products
      </NavLink>
      <NavLink to="/todos" style={({isActive}) => style.navLink(isActive)}>
        Todos
      </NavLink>
      {isAuthenticated && !user?.isAdmin && (
        <NavLink to="/history" style={({isActive}) => style.navLink(isActive)}>
          History
        </NavLink>
      )}
    </Box>
  );
}
