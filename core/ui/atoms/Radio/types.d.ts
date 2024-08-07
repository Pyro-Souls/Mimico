export interface IRadio {
  options: IRadiOptions[];
  radioMode?: TRadioMode;
  onChange?: (value?: number) => void;
}

export interface IRadiOptions {
  label: string;
  value: number;
}

export type TRadioMode = "row" | "column";
