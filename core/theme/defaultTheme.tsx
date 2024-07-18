import { themes } from "./themes";
import { ThemeProvider } from "styled-components";
import { createContext, FC, useState } from "react";
import { TDefaultTheme, TDefaultThemeContext } from "./types";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ThemeContext = createContext<TDefaultThemeContext>(
  {} as TDefaultThemeContext
);

const DefaultTheme: FC<{ children: JSX.Element }> = ({ children }) => {
  const [theme, setTheme] = useState<TDefaultTheme>(() => {
    const lsTheme = AsyncStorage.getItem("theme") || "light";
    return themes["light"];
  });

  const changeTheme = () => {
    const key = AsyncStorage.setItem("theme", theme?.key);
    setTheme(themes[key as never]);
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default DefaultTheme;
