import { themes } from "./themes";
import { ThemeProvider } from "styled-components";
import { FC, useState, useEffect, createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TDefaultTheme, TDefaultThemeContext, ThemeKeys } from "./types";

export const ThemeContext = createContext<TDefaultThemeContext>(
  {} as TDefaultThemeContext
);

const DefaultTheme: FC<{ children: JSX.Element }> = ({ children }) => {
  const [theme, setTheme] = useState<TDefaultTheme>(themes.light);

  useEffect(() => {
    const loadTheme = async () => {
      const lsTheme = await AsyncStorage.getItem("theme");
      if (lsTheme && themes[lsTheme as ThemeKeys]) {
        setTheme(themes[lsTheme as ThemeKeys]);
      }
    };
    loadTheme();
  }, []);

  const changeTheme = async (key: ThemeKeys = "light") => {
    await AsyncStorage.setItem("theme", key);
    setTheme(themes[key]);
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default DefaultTheme;
