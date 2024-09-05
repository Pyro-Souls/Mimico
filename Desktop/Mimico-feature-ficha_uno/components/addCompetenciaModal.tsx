import React, { useState } from "react";
import { Modal, View, TextInput, StyleSheet } from "react-native";
import { Button, Typography } from "../core/ui/atoms";

const AddCompetenciaModal = ({
  visible,
  onClose,
  onSave,
}: {
  visible: boolean;
  onClose: () => void;
  onSave: (value: string) => void;
}) => {
  const [value, setValue] = useState<string>("");

  const handleSave = () => {
    if (value.trim()) {
      onSave(value);
      setValue("");
      onClose();
    }
  };

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Typography size="h5" text="Add Competencia" />
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={setValue}
            placeholder="Enter Competencia"
          />
          <Button title="Save" onPress={handleSave} />
          <Button title="Cancel" onPress={onClose} />
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
    width: 300,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 10,
    width: "100%",
  },
});

export default AddCompetenciaModal;
