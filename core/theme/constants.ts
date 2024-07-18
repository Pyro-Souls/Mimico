import { createContext } from "react";
import { TDefaultThemeContext } from "./types";

export const ThemeContext = createContext<TDefaultThemeContext>(
  {} as TDefaultThemeContext
);
