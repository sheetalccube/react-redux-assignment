export const THEME = {
  Dark: "dark",
  Light: "light",
} as const;

export type ThemeMode = (typeof THEME)[keyof typeof THEME];
