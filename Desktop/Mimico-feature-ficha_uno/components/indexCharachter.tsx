import React from "react";
import {
  View,
  Image,
  Pressable,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { Typography } from "../core/ui/atoms";
import { CharacterData } from "../common/types/CharacterData";
import { GlobalSheet } from "../core/ui/GlobalSheet";
import CharacteristicaSection from "./charSection";

type CharacterCardProps = {
  characterData: CharacterData;
  index: number;
  onPress: () => void;
};

const CharacterCard: React.FC<CharacterCardProps> = ({
  characterData,
  index,
  onPress,
}) => {
  const isImageRight = index % 2 === 0;

  return (
    <Pressable style={GlobalSheet.card} onPress={onPress}>
      <View style={styles.cardContent}>
        {isImageRight ? (
          <>
            <Typography size="h5" text={characterData.nombre} />
            {characterData.imageUri ? (
              <Image
                source={{ uri: characterData.imageUri }}
                style={styles.imageRight}
              />
            ) : (
              <View style={styles.placeholderImage} />
            )}
          </>
        ) : (
          <>
            {characterData.imageUri ? (
              <Image
                source={{ uri: characterData.imageUri }}
                style={styles.imageLeft}
              />
            ) : (
              <View style={styles.placeholderImage} />
            )}
            <Typography size="h5" text={characterData.nombre} />
          </>
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
  },
  imageRight: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginLeft: 90,
  },
  imageLeft: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 80,
  },
  placeholderImage: {
    width: 100,
    height: 100,
    borderRadius: 25,
    backgroundColor: "#ccc",
    marginRight: 20,
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
  },
});

export default CharacterCard;
