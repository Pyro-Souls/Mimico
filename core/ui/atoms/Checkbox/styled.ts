import { TRadioMode } from "./types";
import styled from "styled-components/native";

export const CheckboxContainer = styled.View<{ radioMode: TRadioMode }>`
  gap: 10px;
  width: 100%;
  height: auto;
  flex-wrap: wrap;
  justify-content: space-between;
  flex-direction: ${({ radioMode }) => radioMode};
`;

export const RadioButton = styled.TouchableOpacity`
  gap: 5px;
  align-items: center;
  flex-direction: row;
`;

export const RadioContent = styled.View`
  width: 25px;
  height: 25px;
  align-items: center;
  justify-content: center;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  border: 3px solid ${({ theme }) => theme?.colors?.main.brown};
`;

export const RadioLabel = styled.Text`
  font-size: 16px;
  font-family: OutfitRegular;
  color: ${({ theme }) => theme?.colors?.main.brown};
`;

export const RadioSelected = styled.View`
  width: 14px;
  height: 14px;
  border-radius: 3px;
  background-color: ${({ theme }) => theme?.colors?.main.brownAccent};
`;
