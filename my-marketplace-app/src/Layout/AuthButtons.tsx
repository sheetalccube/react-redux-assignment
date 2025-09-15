import {Button, Box} from "@mui/material";
import useStyle from "@/Layout/HeaderStyle";
export interface AuthButtonsProps {
  isAuthenticated: boolean;
  onLogout: () => void;
  navigate: (path: string) => void;
}

export default function AuthButtons({
  isAuthenticated,
  onLogout,
  navigate,
}: AuthButtonsProps) {
  const styles = useStyle();

  return isAuthenticated ? (
    <Button
      variant="outlined"
      color="inherit"
      onClick={onLogout}
      sx={styles.authLogoutButton}
    >
      Logout
    </Button>
  ) : (
    <Box sx={styles.authBox}>
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
  );
}
