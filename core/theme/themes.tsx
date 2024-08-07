import { TDefaultTheme } from "./types";

export const lightTheme: TDefaultTheme = {
  key: "light",
  colors: {
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
};

export const greenTheme: TDefaultTheme = {
  key: "green",
  colors: {
    background: {
      main: "#E1F7E7",
    },
    main: {
      primary: "#1EAD4F",
      secondary: "#6AA872",
      brown: "#3C553E",
      brownAccent: "#4E6D53",
      pink: "#A8E0BC",
    },
    border: {
      default: "#2E7D32",
      secondary: "#1EAD4F",
    },
    color: {
      text: "#3C553E",
      primary: "#E1F7E7",
      secondary: "#1EAD4F",
      tertiary: "#000000",
    },
  },
};

export const blueTheme: TDefaultTheme = {
  key: "blue",
  colors: {
    background: {
      main: "#D0E8F2",
    },
    main: {
      primary: "#0A73B7",
      secondary: "#4A90E2",
      brown: "#123C69",
      brownAccent: "#1B5A89",
      pink: "#A1CFF1",
    },
    border: {
      default: "#0A73B7",
      secondary: "#123C69",
    },
    color: {
      text: "#0A3D62",
      primary: "#F0F8FF",
      secondary: "#0A73B7",
      tertiary: "#000000",
    },
  },
};

export const themes = {
  light: lightTheme,
  green: greenTheme,
  blue: blueTheme,
};
