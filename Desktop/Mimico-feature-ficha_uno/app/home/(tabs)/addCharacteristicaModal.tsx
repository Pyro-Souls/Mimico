import React, { useState } from "react";
import { Modal, View, Text, TextInput, Button, StyleSheet } from "react-native";

const AddCharacteristicaModal = ({
  visible,
  onClose,
  onSave,
}: {
  visible: boolean;
  onClose: () => void;
  onSave: (type: "number" | "text", value: string) => void;
}) => {
  const [type, setType] = useState<"number" | "text">("text");
  const [value, setValue] = useState<string>("");

  const handleSave = () => {
    onSave(type, value);
    setValue("");
    onClose();
  };

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}> Select Type </Text>
          <Button title="Number" onPress={() => setType("number")} />
          <Button title="Text" onPress={() => setType("text")} />
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={setValue}
            placeholder={type === "number" ? "Enter number" : "Enter text"}
            keyboardType={type === "number" ? "numeric" : "default"}
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
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 10,
    width: "100%",
  },
});

export default AddCharacteristicaModal;
