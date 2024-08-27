import styled from "styled-components/native";
import { ITypographyLabel } from "./interface";

export const TypographyLabel = styled.Text<ITypographyLabel>`
  font-size: ${({ size }) => size};
  font-weight: ${({ fontWeight }) => fontWeight};
  color: ${({ theme, color }) => `${theme?.colors?.color[color]}`};
  font-family: ${({ isText }) => (isText ? "OutfitRegular" : "CarterOne")};
`;
