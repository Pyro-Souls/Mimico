import {
  RadioLabel,
  RadioButton,
  RadioContent,
  RadioSelected,
  CheckboxContainer,
} from "./styled";
import { FC } from "react";
import { ICheckbox } from "./types";
import { useCheck } from "./useRadio";

export const Checkbox: FC<ICheckbox> = ({
  options,
  onChange,
  radioMode = "row",
}) => {
  const { selected, handleSelect } = useCheck(onChange);

  return (
    <CheckboxContainer radioMode={radioMode}>
      {options?.map(({ label, value }) => (
        <RadioButton
          onPress={() => handleSelect(value)}
          key={`option-check-${label}-${value}`}
        >
          <RadioContent>
            {selected.includes(value) && <RadioSelected />}
          </RadioContent>
          <RadioLabel>{label}</RadioLabel>
        </RadioButton>
      ))}
    </CheckboxContainer>
  );
};
