export type TDefaultThemeContext = {
  theme?: TDefaultTheme;
  changeTheme: (key: ThemeKeys) => void;
};

export type ThemeKeys = "light" | "green" | "blue";

export type TDefaultTheme = {
  key: ThemeKeys;
  colors: Theme;
};

interface ColorPalette {
  primary: string;
  secondary: string;
  brown: string;
  brownAccent: string;
  pink: string;
}

interface BorderPalette {
  default: string;
  secondary: string;
}

interface ThemeTextColorPalette {
  text: string;
  primary: string;
  tertiary: string;
  secondary: string;
}

interface Background {
  main: string;
}

interface Theme {
  main: ColorPalette;
  border: BorderPalette;
  background: Background;
  color: ThemeTextColorPalette;
}
