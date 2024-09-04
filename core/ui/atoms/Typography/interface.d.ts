import { TThemeColor } from "../theme";


interface ITypographyLabel {
  size: TSize;
  isText: Boolean;
  align?: TAligns;
  color?: TThemeColor;
  fontWeight: IBoldTypes;
  
}

export interface ITypography {
  text: string;
  size?: TSize;
  align?: TAligns;
  color?: TThemeColor;
  fontWeight?: IBoldTypes;
}

export type IBoldTypes = "normal" | "bolder" | "bold";

export type TAligns = "right" | "left" | "center" | "justify" | "end" | "start";

export type TSize =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "sm"
  | "md"
  | "lg"
  | "subtext"
  | "microtext";
