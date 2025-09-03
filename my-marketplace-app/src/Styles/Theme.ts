import { createTheme } from "@mui/material/styles";
import { COLORS } from "@/Styles/Colors";
import { type ThemeMode, THEME } from "@/Constants/ReusableText";

export function getTheme(mode: ThemeMode) {
  return createTheme({
    palette: {
      mode,
      primary: {
        main: COLORS.PRIMARY,
      },
      ...(mode === THEME.Dark
        ? {
          text: {
            primary: COLORS.DARK.TEXT_PRIMARY,
            secondary: COLORS.DARK.TEXT_SECONDARY,
          },
          background: {
            default: COLORS.DARK.BACKGROUND,
            paper: COLORS.DARK.PAPER,
          },
        }
        : {
          text: {
            primary: COLORS.LIGHT.TEXT_PRIMARY,
            secondary: COLORS.LIGHT.TEXT_SECONDARY,
          },
          background: {
            default: COLORS.LIGHT.BACKGROUND,
            paper: COLORS.LIGHT.PAPER,
          },
        }),
    },
  });
}
