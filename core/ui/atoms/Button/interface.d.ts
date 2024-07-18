import { TouchableOpacityProps } from "react-native";

export type TIcons =
  | "add"
  | "bread"
  | "cog"
  | "door"
  | "edit"
  | "google"
  | "home"
  | "save"
  | "user";

type TButtonColorType = "primary" | "secondary";

type TVariant = "filled" | "outline" | "dashed" | "text";

type TButtonType = "primary" | "secondary" | "brown" | "brownAccent" | "pink";

interface ButtonProps extends TouchableOpacityProps {
  icon?: TIcons;
  title?: string;
  dense?: boolean;
  type?: TButtonType;
  variant?: TVariant;
  color?: TButtonColorType;
}

export interface ITouchable {
  dense?: boolean;
  type: TButtonType;
  variant: TVariant;
}

export interface ITitleColor {
  color?: string;
  variant: TVariant;
}
