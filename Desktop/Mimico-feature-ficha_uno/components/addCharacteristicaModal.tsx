import React, { useState } from "react";
import {
  Modal,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
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

          <TouchableOpacity style={styles.cardContainer} onPress={handleSave}>
            <ImageBackground
              source={require("../assets/cuadrado.png")}
              style={styles.backgroundImage}
              imageStyle={styles.imageStyle}
            >
              <View>
                <TextInput
                  style={styles.input}
                  value={value}
                  onChangeText={setValue}
                  placeholder={
                    type === "number" ? "Enter number" : "Enter text"
                  }
                  keyboardType={type === "number" ? "numeric" : "default"}
                />
              </View>
            </ImageBackground>
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
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  imageStyle: {
    borderRadius: 30,
    opacity: 0.5,
  },
  input: {
    width: "90%",
    textAlign: "center",
    fontSize: 16,
    height: "100%",
    color: "#000",
  },
});

export default AddCharacteristicaModal;
