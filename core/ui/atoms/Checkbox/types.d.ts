export interface ICheckbox {
  radioMode?: TRadioMode;
  options: ICheckboxOptions[];
  onChange?: (selectedValues: number[]) => void;
}

export interface ICheckboxOptions {
  label: string;
  value: number;
}

export type TRadioMode = "row" | "column";
