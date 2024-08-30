import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Characteristicas } from "../../../common/types/CharacterData";

interface CharacteristicaCardProps extends Characteristicas {
  onPress: () => void;
}

const CharacteristicaCard: React.FC<CharacteristicaCardProps> = ({
  title,
  type,
  onPress,
}) => {
  return (
    <View style={styles.cardContainer} onTouchEnd={onPress}>
      {type === "number" && <Text style={styles.number}>Number</Text>}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: 100,
    height: 150,
    borderRadius: 10,
    borderWidth: 1,
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
  },
});

export default CharacteristicaCard;
