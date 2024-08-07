import { useState } from "react";

export const useRadio = (onChange?: (value?: number) => void) => {
  const [selected, setSelected] = useState<number | null>(null);

  const handleSelect = (value: number) => {
    setSelected(value);
    if (onChange) onChange(value);
  };

  return { selected, handleSelect };
};
