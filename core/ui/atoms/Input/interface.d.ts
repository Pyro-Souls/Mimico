import { TextInputProps } from "react-native";

export interface IInput extends TextInputProps {
  label?: string;
  isArea?: boolean;
}

export interface IInputGenerics {
  isArea?: boolean;
  multiline?: boolean;
}
