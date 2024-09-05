import React, { useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  Dimensions,
} from "react-native";
import { Button, Typography } from "../core/ui/atoms";
import { Characteristicas } from "../common/types/CharacterData";
import CharacteristicaSection from "./charSection";

interface CharacteristicasProps {
  characteristicas: Characteristicas[];
  handleRemoveCharacteristica: (index: number) => void;
  handleAddCharacteristica: () => void;
}

const CharacteristicasList: React.FC<CharacteristicasProps> = ({
  characteristicas,
  handleRemoveCharacteristica,
  handleAddCharacteristica,
}) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const renderCharacteristicaItem = ({
    item,
    index,
  }: {
    item: Characteristicas;
    index: number;
  }) => (
    <View style={styles.characteristicaCard}>
      <View style={styles.characteristicaRow}>
        {/* Render two ImageBackground in one row */}
        <View style={styles.imageContainer}>
          <ImageBackground
            source={require("../assets/cuadrado.png")}
            style={styles.backgroundImage}
          >
            <CharacteristicaSection characteristicas={[item]} />
            <TouchableOpacity
              style={styles.deleteIcon}
              onPress={() => handleRemoveCharacteristica(index)}
            >
              <Image
                source={require("../assets/icons/cog-icon-black.png")}
                style={styles.deleteImage}
              />
            </TouchableOpacity>
          </ImageBackground>
        </View>

        {index + 1 < characteristicas.length && (
          <View style={styles.imageContainer}>
            <ImageBackground
              source={require("../assets/cuadrado.png")}
              style={styles.backgroundImage}
            >
              <CharacteristicaSection
                characteristicas={[characteristicas[index + 1]]}
              />
              <TouchableOpacity
                style={styles.deleteIcon}
                onPress={() => handleRemoveCharacteristica(index + 1)}
              >
                <Image
                  source={require("../assets/icons/cog-icon-black.png")}
                  style={styles.deleteImage}
                />
              </TouchableOpacity>
            </ImageBackground>
          </View>
        )}
      </View>
    </View>
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
            data={characteristicas}
            renderItem={renderCharacteristicaItem}
            keyExtractor={(_, index) => index.toString()}
            numColumns={2}
          />
          <TouchableOpacity
            onPress={handleAddCharacteristica}
            style={styles.backgroundImage}
          >
            <Image source={require("../assets/cuadrado-plus.png")}></Image>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const { width } = Dimensions.get("window");
const imageWidth = (width - 100) / 2;

const styles = StyleSheet.create({
  characteristicaCard: {
    marginBottom: 25,
  },
  characteristicaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  imageContainer: {
    width: imageWidth,
    marginRight: 15,
  },
  backgroundImage: {
    width: "100%",
    height: 250,
    justifyContent: "center",
    position: "relative",
  },
  deleteIcon: {
    position: "absolute",
    top: 10,
    right: 10,
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
});

export default CharacteristicasList;
