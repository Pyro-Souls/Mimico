// import { GlobalTheme } from "../theme";
import { IInputGenerics } from "./interface";
import styled from "styled-components/native";

export const InputContainer = styled.View<IInputGenerics>`
  width: 100%;
`;

export const InputLabel = styled.Text`
  font-size: 15px;
  font-family: OutfitSemibold;
`;

export const InputCustom = styled.TextInput<IInputGenerics>`
  padding: 0 15px;
  border-radius: 5px;
  font-family: OutfitSemibold;
  height: ${({ multiline }) => (multiline ? "110px" : "50px")};
  /* border: 3px solid ${({}) => GlobalTheme?.light?.border?.default}; */
  /* background-color: ${({}) => GlobalTheme?.light?.background?.main}; */
`;
