import React, { useState } from "react";
import {
  Modal,
  View,
  TextInput,
  StyleSheet,
  Switch,
  TouchableOpacity,
  Text,
  FlatList,
} from "react-native";
import { Button, Typography, Radio } from "../core/ui/atoms";

const AddCompetenciaModal = ({
  visible,
  onClose,
  onSave,
}: {
  visible: boolean;
  onClose: () => void;
  onSave: (value: { text: string; size: string }) => void;
}) => {
  const [value, setValue] = useState<string>("");
  const [isDescriptive, setIsDescriptive] = useState<boolean>(false);
  const [size, setSize] = useState<string>("Estandar"); // Хранение выбранного размера
  const [isSizeListVisible, setIsSizeListVisible] = useState<boolean>(false); // Управление видимостью списка

  const handleSave = () => {
    if (value.trim()) {
      onSave({ text: value, size });
      setValue("");
      setSize("Estandar"); // Сброс размера по умолчанию
      onClose();
    }
  };

  const handleSizeSelect = (selectedSize: string) => {
    setSize(selectedSize);
    setIsSizeListVisible(false);
  };

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Typography size="h5" text="Preview" />

          <TextInput
            style={styles.input}
            value={value}
            onChangeText={setValue}
            placeholder="+18 Nombre otro texto"
          />

          <Radio
            options={[
              { label: "Numérico entero", value: 1 },
              { label: "Numérico lista", value: 2 },
            ]}
          />

          <View style={styles.switchContainer}>
            <Typography size="h6" text="Nombre Descriptivo" />
            <Switch value={isDescriptive} onValueChange={setIsDescriptive} />
          </View>

          <View style={styles.switchContainer}>
            <Typography size="h6" text="Bonificadores (D&D)" />
            <Switch
              value={!isDescriptive}
              onValueChange={(value) => setIsDescriptive(!value)}
            />
          </View>

          <View style={styles.sizeContainer}>
            <TouchableOpacity
              style={styles.sizeButton}
              onPress={() => setIsSizeListVisible(!isSizeListVisible)}
            >
              <Text style={styles.sizeButtonText}>{size}</Text>
            </TouchableOpacity>

            {isSizeListVisible && (
              <View style={styles.sizeList}>
                <TouchableOpacity
                  style={styles.sizeOption}
                  onPress={() => handleSizeSelect("Estandar")}
                >
                  <Text style={styles.sizeOptionText}>Estandar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.sizeOption}
                  onPress={() => handleSizeSelect("Grande")}
                >
                  <Text style={styles.sizeOptionText}>Grande</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

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
    width: 380,
    padding: 40,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  input: {
    borderWidth: 2,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 10,
    width: "100%",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginVertical: 10,
  },
  sizeContainer: {
    width: "100%",
    marginVertical: 10,
  },
  sizeButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
  },
  sizeButtonText: {
    fontSize: 16,
    color: "#000",
  },
  sizeList: {
    marginTop: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#fff",
    maxHeight: 100,
    overflow: "hidden",
  },
  sizeOption: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  sizeOptionText: {
    fontSize: 16,
    color: "#000",
  },
});

export default AddCompetenciaModal;
