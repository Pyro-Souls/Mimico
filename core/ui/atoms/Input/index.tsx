import { FC } from "react";
import { IInput } from "./interface";
import { InputContainer, InputCustom, InputLabel } from "./styled";

export const Input: FC<IInput> = ({ label, isArea, ...props }) => {
  const { placeholder, value } = props;

  return (
    <InputContainer isArea={isArea}>
      {label && <InputLabel>{label}</InputLabel>}
      <InputCustom
        value={value}
        multiline={isArea}
        placeholder={placeholder}
        {...props}
      />
    </InputContainer>
  );
};
