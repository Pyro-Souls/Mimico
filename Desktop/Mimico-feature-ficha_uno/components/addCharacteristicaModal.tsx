import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Switch,
} from "react-native";
import { Button, Typography, Radio } from "../core/ui/atoms";
import { Characteristica } from "../common/types/CharacterData";

const generateId = () => Math.random().toString(36).substr(2, 9);

const AddCharacteristicaModal = ({
  visible,
  onClose,
  onSave,
  initialCharacteristica, // Новое свойство для передачи начального состояния
}: {
  visible: boolean;
  onClose: () => void;
  onSave: (characteristica: Characteristica) => void;
  initialCharacteristica: Characteristica | null; // Пропс для редактируемой характеристики
}) => {
  const [number1, setNumber1] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [number2, setNumber2] = useState<string>("");
  const [isDescriptive, setIsDescriptive] = useState<boolean>(false);

  useEffect(() => {
    if (initialCharacteristica) {
      setNumber1(initialCharacteristica.number1);
      setName(initialCharacteristica.name);
      setNumber2(initialCharacteristica.number2);
    } else {
      setNumber1("");
      setName("");
      setNumber2("");
    }
  }, [initialCharacteristica]);

  const handleSave = () => {
    const characteristica: Characteristica = {
      id: initialCharacteristica?.id || generateId(),
      number1,
      name,
      number2,
    };
    onSave(characteristica);
    setNumber1("");
    setName("");
    setNumber2("");
    onClose();
  };

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Typography size="h5" text="Preview" />

          <TouchableOpacity style={styles.cardContainer} onPress={handleSave}>
            <ImageBackground
              source={require("../assets/Marcos/Valor_numérico-4.png")}
              style={styles.backgroundImage}
              imageStyle={styles.imageStyle}
            >
              <View style={styles.inputsContainer}>
                <TextInput
                  style={styles.inputNumber}
                  value={number1}
                  onChangeText={setNumber1}
                  placeholder="8"
                  placeholderTextColor="gray"
                  keyboardType="numeric"
                />

                <TextInput
                  style={styles.inputNumber2}
                  value={number2}
                  onChangeText={setNumber2}
                  placeholder="+"
                  placeholderTextColor="gray"
                  keyboardType="numeric"
                />
                <TextInput
                  style={styles.inputName}
                  value={name}
                  onChangeText={setName}
                  placeholder="+"
                  placeholderTextColor="gray"
                />
              </View>
            </ImageBackground>
          </TouchableOpacity>
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
    width: 350,
    height: 700,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  cardContainer: {
    width: 190,
    alignItems: "center",
    margin: 50,
    padding: 8,
    flex: 1,
    justifyContent: "center",
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  imageStyle: {},
  inputsContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  inputNumber: {
    width: "90%",
    textAlign: "center",
    fontSize: 40,
    color: "black",
    height: 70,
    marginBottom: 15,
  },
  inputName: {
    width: "90%",
    textAlign: "center",
    fontSize: 30,
    color: "black",
    marginBottom: 5,
  },
  inputNumber2: {
    width: "90%",
    textAlign: "center",
    fontSize: 16,
    height: 70,
    color: "red",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginVertical: 10,
  },
});

export default AddCharacteristicaModal;
