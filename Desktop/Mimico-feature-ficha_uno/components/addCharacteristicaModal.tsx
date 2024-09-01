import React, { useState } from "react";
import {
  Modal,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import { Button, Typography } from "../core/ui/atoms";

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
          <Typography size="h5" text="Select Type" />
          <Typography size="h6" text="Preview" />

          {/* Card container with ellipse inside */}
          <TouchableOpacity style={styles.cardContainer} onPress={handleSave}>
            <View style={styles.ellipseContainer}>
              <TextInput
                style={styles.input}
                value={value}
                onChangeText={setValue}
                placeholder={type === "number" ? "Enter number" : "Enter text"}
                keyboardType={type === "number" ? "numeric" : "default"}
              />
            </View>
          </TouchableOpacity>

          <Button
            title="Number"
            variant="text"
            onPress={() => setType("number")}
          />
          <Button title="Text" variant="text" onPress={() => setType("text")} />

          <Button title="Confirmo" onPress={handleSave} />
          <Button title="Mejor no" onPress={onClose} />
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
  cardContainer: {
    width: 120,
    height: 180,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  number: {
    fontSize: 24,
    fontWeight: "bold",
  },
  title: {
    fontSize: 18,
    marginTop: 10,
    textAlign: "center",
  },
  ellipseContainer: {
    marginTop: 15,
    width: "100%",
    height: 80,
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#000",
    paddingHorizontal: 5,
    borderRadius: 30,
    transform: [{ skewX: "10deg" }],
  },
  input: {
    width: "90%",
    textAlign: "center",
    fontSize: 16,
    height: "100%",
  },
});

export default AddCharacteristicaModal;
