import { type PropsWithChildren } from "react";
import type { Theme } from "../contexts";
export interface ThemeProviderProps extends PropsWithChildren {
    defaultTheme?: Theme;
}
export declare function ThemeProvider({ children, defaultTheme, }: ThemeProviderProps): import("react").JSX.Element;
