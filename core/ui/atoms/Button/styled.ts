import styled from "styled-components/native";
import { ITitleColor, ITouchable } from "./interface";

export const Touchable = styled.TouchableOpacity<ITouchable>`
  gap: 16px;
  height: 60px;
  padding: 8px 24px;
  flex-direction: row;
  border-radius: 12px;
  align-items: center;
  justify-content: center;
  width: ${({ dense }) => (dense ? "auto" : "100%")};
  background-color: ${({ type, variant, theme }) =>
    variant === "filled"
      ? theme?.colors?.main?.[type as never]
      : "transparent"};

  /* border: ${({ variant, theme }) =>
    variant === "text"
      ? "0px"
      : variant === "dashed"
      ? `3px dashed ${theme?.colors?.border?.secondary}`
      : variant === "outline"
      ? `3px solid ${theme?.colors?.border?.secondary}`
      : `3px solid ${theme?.colors?.border?.default}`}; */
`;

export const Title = styled.Text<ITitleColor>`
  font-size: 24px;
  font-family: CarterOne;
  text-transform: uppercase;
  color: ${({ theme, color, variant }) =>
    variant === "filled"
      ? theme?.colors?.color?.[color as never]
      : theme?.colors?.color?.secondary};
`;

export const IconPreview = styled.Image`
  width: 24px;
  height: 24px;
`;
