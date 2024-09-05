import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { Typography } from "../core/ui/atoms";
import { Characteristicas } from "../common/types/CharacterData";

interface CharacteristicaSectionProps {
  characteristicas: Characteristicas[];
}

const CharacteristicaSection: React.FC<CharacteristicaSectionProps> = ({
  characteristicas,
}) => {
  const renderCharacteristicaItem = ({ item }: { item: Characteristicas }) => (
    <View style={styles.characteristicaItem}>
      <Typography size="h6" text={`${item.title} (${item.type})`} />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={characteristicas}
        renderItem={renderCharacteristicaItem}
        keyExtractor={(_, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  characteristicaItem: {
    marginBottom: 5,
  },
});

export default CharacteristicaSection;
