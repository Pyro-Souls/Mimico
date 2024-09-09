import React, { useState } from "react";
import { Modal, View, StyleSheet } from "react-native";
import {
  RadioContainer,
  RadioContent,
  RadioButton,
  RadioLabel,
  RadioSelected,
} from "../core/ui/atoms/Radio/styled";
import { IRadio } from "../core/ui/atoms/Radio/types";
import { GlobalSheet } from "../core/ui";
import { Button, Typography } from "../core/ui/atoms";

interface AddFieldModalProps {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: (fieldType: string) => void;
}

const AddFieldModal: React.FC<AddFieldModalProps> = ({
  isVisible,
  onClose,
  onConfirm,
}) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleConfirm = () => {
    if (selectedOption === 1) {
      onConfirm("competencia");
    } else if (selectedOption === 2) {
      onConfirm("characteristica");
    } else if (selectedOption === 3) {
      onConfirm("imagen");
    }
    onClose();
  };

  const radioOptions: IRadio["options"] = [
    { label: "Competencia", value: 1 },
    { label: "Characteristica", value: 2 },
    { label: "Imagen", value: 3 },
  ];

  return (
    <Modal visible={isVisible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Typography size="h5" text="¿Qué tipo de datos quiere agregar?" />

          <RadioContainer radioMode="column">
            {radioOptions.map((option) => (
              <RadioContent key={option.value}>
                <RadioButton onPress={() => setSelectedOption(option.value)}>
                  {selectedOption === option.value && <RadioSelected />}
                </RadioButton>
                <RadioLabel>{option.label}</RadioLabel>
              </RadioContent>
            ))}
          </RadioContainer>

          <Button title="Confirmar" onPress={handleConfirm} />
          <Button title="Cancelar" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    paddingHorizontal: 35,
    paddingVertical: 60,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: 300,
    height: 500,
    alignItems: "center",
  },
});

export default AddFieldModal;
