import React, { useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { Button, Typography } from "../core/ui/atoms";
import { Characteristicas } from "../common/types/CharacterData";
import CharacteristicaCard from "./characteristicaCard";

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
      <CharacteristicaCard
        characterData={item}
        index={index}
        onPress={() => {
          console.log(`Pressed on ${item.title}`);
        }}
      />
      <TouchableOpacity
        style={styles.deleteIcon}
        onPress={() => handleRemoveCharacteristica(index)}
      >
        <Image
          source={require("../assets/icons/cog-icon-black.png")}
          style={styles.deleteImage}
        />
      </TouchableOpacity>
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
            horizontal
          />
          <Button title="Agregar campo" onPress={handleAddCharacteristica} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  characteristicaCard: {
    marginBottom: 20,
    position: "relative",
  },
  deleteIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 24,
    height: 24,
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
