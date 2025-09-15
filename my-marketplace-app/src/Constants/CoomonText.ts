export const THEME = {
  Dark: "dark",
  Light: "light",
} as const;

export type THEME_MODE = (typeof THEME)[keyof typeof THEME];
