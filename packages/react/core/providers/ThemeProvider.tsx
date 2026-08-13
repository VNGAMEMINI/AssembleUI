import {
  useState
} from "react";

import {
  ThemeContext
} from "../contexts";

export function ThemeProvider({
  children,
  defaultTheme = "light"
}) {

  const [
    theme,
    setTheme
  ] = useState(defaultTheme);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme
      }}
    >
      <div
        data-aui-theme={theme}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}
