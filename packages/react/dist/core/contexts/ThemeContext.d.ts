import type { Dispatch, SetStateAction } from "react";
export type Theme = "light" | "dark" | "custom";
export interface ThemeContextValue {
    theme: Theme;
    setTheme: Dispatch<SetStateAction<Theme>>;
}
export declare const ThemeContext: import("react").Context<ThemeContextValue | undefined>;
