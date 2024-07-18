export type TDefaultThemeContext = {
  theme?: TDefaultTheme;
  changeTheme: () => void;
};

export type ThemeKeys = "light" | "dark";

export type TDefaultTheme = {
  key: "light" | "dark";
  colors: IGlobalTheme;
};

interface IGlobalTheme {
  light: Theme;
}

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
