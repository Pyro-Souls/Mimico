import styled from "styled-components/native";
import { ITypographyLabel } from "./interface";
// import { GlobalTheme, TThemeColor } from "../theme";

export const TypographyLabel = styled.Text<ITypographyLabel>`
  font-size: ${({ size }) => size};
  font-weight: ${({ fontWeight }) => fontWeight};
  font-family: ${({ isText }) => (isText ? "OutfitRegular" : "CarterOne")};
  /* color: ${({ color }) => `${GlobalTheme?.light?.color[color as TThemeColor]}`}; */
`;
