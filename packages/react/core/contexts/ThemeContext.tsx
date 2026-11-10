import { createContext } from "react";
import type { Dispatch, SetStateAction } from "react";

export type Theme = "light" | "dark" | "custom";

export interface ThemeContextValue {
  theme: Theme;
  setTheme: Dispatch<SetStateAction<Theme>>;
}

export const ThemeContext = createContext<ThemeContextValue | undefined>(
  undefined,
);
