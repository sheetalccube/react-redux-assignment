import {useTheme} from "@mui/material/styles";

export default function useAuthStyle() {
  const theme = useTheme();
  return {
    container: {
      mt: theme.spacing(4),
      textAlign: "center",
    },
    heading: {
      fontSize: "1.5rem",
      fontWeight: theme.typography.fontWeightBold,
      mb: theme.spacing(1),
    },
    message: {
      fontSize: "1rem",
      color: theme.palette.text.secondary,
    },
  };
}
