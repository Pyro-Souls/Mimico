import { useState } from "react";

export const useCheck = (onChange?: (selectedValues: number[]) => void) => {
  const [selected, setSelected] = useState<number[]>([]);

  const handleSelect = (value: number) => {
    setSelected((prev) => {
      const newSelected = prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value];
      if (onChange) onChange(newSelected);
      return newSelected;
    });
  };

  return { selected, handleSelect };
};
