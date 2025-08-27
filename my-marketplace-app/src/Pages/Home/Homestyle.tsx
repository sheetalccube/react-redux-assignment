// src/Pages/Home/HomeStyle.ts
import { useTheme } from "@mui/material/styles";

export default function useStyle() {
  const theme = useTheme();

  return {
    container: {
      marginTop: theme.spacing(4),
      [theme.breakpoints.down("sm")]: {
        marginTop: theme.spacing(2),
        padding: theme.spacing(2),
      },
    },
    paper: {
      padding: theme.spacing(4),
      textAlign: "center" as const,
      [theme.breakpoints.down("sm")]: {
        padding: theme.spacing(2),
      },
    },
    title: {
      color: theme.palette.primary.main,
      fontSize: "2rem",
      fontWeight: 600,
      [theme.breakpoints.down("sm")]: {
        fontSize: "1.5rem",
      },
    },
    description: {
      marginBottom: theme.spacing(2),
      color: theme.palette.text.secondary,
      fontSize: "1rem",
      [theme.breakpoints.down("sm")]: {
        fontSize: "0.9rem",
      },
    },
    outletBox: {
      marginTop: theme.spacing(4),
      [theme.breakpoints.down("sm")]: {
        marginTop: theme.spacing(2),
      },
    },
  };
}
