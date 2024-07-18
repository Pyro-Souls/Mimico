import { TRadioMode } from "./types";
import styled from "styled-components/native";

export const RadioContainer = styled.View<{ radioMode: TRadioMode }>`
  gap: 10px;
  width: 100%;
  height: auto;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
`;

export const RadioContent = styled.View`
  gap: 5px;
  align-items: center;
  flex-direction: row;
`;

export const RadioButton = styled.TouchableOpacity`
  width: 25px;
  height: 25px;
  align-items: center;
  border: 3px solid black;
  justify-content: center;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
`;

export const RadioLabel = styled.Text`
  font-size: 16px;
  font-weight: 500;
`;

export const RadioSelected = styled.View`
  width: 12px;
  height: 12px;
  background-color: black;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
`;
