import { TDefaultTheme } from "./types";

export const lightTheme: TDefaultTheme = {
  key: "light",
  colors: {
    light: {
      background: {
        main: "#F7DEAE",
      },
      main: {
        primary: "#D73F3F",
        secondary: "#949494",
        brown: "#661414",
        brownAccent: "#841212",
        pink: "#E47F7F",
      },
      border: {
        default: "#372721",
        secondary: "#D73F3F",
      },
      color: {
        text: "#5C5C5C",
        primary: "#FAF1E0",
        secondary: "#D73F3F",
        tertiary: "#000000",
      },
    },
  },
};

export const themes = {
  light: lightTheme,
};
