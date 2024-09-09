import React, { useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  Dimensions,
  Modal,
} from "react-native";
import { Typography } from "../core/ui/atoms";
import AddCharacteristicaModal from "./addCharacteristicaModal";
import { Characteristica } from "../common/types/CharacterData";

interface CharacteristicasProps {
  characteristicas: Characteristica[];
  handleRemoveCharacteristica: (index: number) => void;
  handleAddCharacteristica: () => void;
}

const CharacteristicasList: React.FC<CharacteristicasProps> = ({
  characteristicas,
  handleRemoveCharacteristica,
}) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [characteristicasState, setCharacteristicasState] =
    useState<Characteristica[]>(characteristicas);
  const [currentCharacteristica, setCurrentCharacteristica] =
    useState<Characteristica | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const numColumns = 2;

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleAddCharacteristica = () => {
    setIsModalVisible(true);
    setCurrentCharacteristica(null); // Новая характеристика
  };

  const handleSaveCharacteristica = (newCharacteristica: Characteristica) => {
    if (editingIndex !== null) {
      // Редактирование существующей характеристики
      const updatedCharacteristicas = [...characteristicasState];
      updatedCharacteristicas[editingIndex] = newCharacteristica;
      setCharacteristicasState(updatedCharacteristicas);
      setEditingIndex(null);
    } else {
      // Добавление новой характеристики
      setCharacteristicasState([...characteristicasState, newCharacteristica]);
    }
    setIsModalVisible(false);
  };

  const handleEditCharacteristica = (index: number) => {
    setCurrentCharacteristica(characteristicasState[index]);
    setEditingIndex(index);
    setIsModalVisible(true);
  };

  const removeCharacteristica = (index: number) => {
    const updatedCharacteristicas = characteristicasState.filter(
      (_, i) => i !== index
    );
    setCharacteristicasState(updatedCharacteristicas);
  };

  const renderCharacteristicaItem = ({
    item,
    index,
  }: {
    item: Characteristica;
    index: number;
  }) => (
    <TouchableOpacity
      onLongPress={() => handleEditCharacteristica(index)}
      style={styles.characteristicaCard}
    >
      <View style={styles.characteristicaRow}>
        <View style={styles.imageContainer}>
          <ImageBackground
            source={require("../assets/Marcos/Valor_numérico-4.png")}
            style={styles.backgroundImage}
          >
            <View style={styles.characteristicaDetails}>
              <Typography size="h1" text={item.number1} />
              <Typography size="h6" text={item.number2} />
              <Typography size="h5" text={item.name} />
            </View>

            <TouchableOpacity
              style={styles.deleteIcon}
              onPress={() => removeCharacteristica(index)}
            >
              <Image
                source={require("../assets/icons/cog-icon-black.png")}
                style={styles.deleteImage}
              />
            </TouchableOpacity>
          </ImageBackground>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleCollapse}>
          <View style={styles.headerContent}>
            <Typography size="h5" text="Characterísticas" />
            <Image
              source={require("../assets/icons/edit-icon-alternative.png")}
            />
            <Image
              source={require("../assets/icons/arrow-down-icon-alternative.png")}
              style={[
                styles.arrowIcon,
                { transform: [{ rotate: isCollapsed ? "180deg" : "0deg" }] },
              ]}
            />
          </View>
        </TouchableOpacity>
      </View>

      {!isCollapsed && (
        <>
          <FlatList
            data={characteristicasState}
            renderItem={renderCharacteristicaItem}
            keyExtractor={(_, index) => index.toString()}
            numColumns={numColumns}
            key={numColumns}
          />

          <TouchableOpacity
            onPress={handleAddCharacteristica}
            style={styles.addButton}
          >
            <Image source={require("../assets/cuadrado-plus.png")} />
          </TouchableOpacity>
        </>
      )}

      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <AddCharacteristicaModal
          visible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          onSave={handleSaveCharacteristica}
          initialCharacteristica={currentCharacteristica} // Передаем текущую характеристику или null
        />
      </Modal>
    </View>
  );
};

const { width } = Dimensions.get("window");
const imageWidth = (width - 80) / 2;

const styles = StyleSheet.create({
  characteristicaCard: {
    marginBottom: 25,
    alignItems: "center",
  },
  characteristicaRow: {
    flexDirection: "row",
    justifyContent: "center",
  },
  imageContainer: {
    width: imageWidth,
    marginHorizontal: 0,
  },
  backgroundImage: {
    width: "99%",
    height: 250,
    justifyContent: "center",
    position: "relative",
  },
  characteristicaDetails: {
    padding: 5,
    alignItems: "center",
  },
  deleteIcon: {
    position: "absolute",
    top: 20,
    right: 5,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  arrowIcon: {
    width: 20,
    height: 20,
    marginLeft: 10,
    resizeMode: "contain",
  },
  addButton: {
    marginVertical: 20,
  },
});

export default CharacteristicasList;
