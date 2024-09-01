import React, { useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { Input, Button, Typography } from "../core/ui/atoms";
import { Competencia } from "../common/types/CharacterData";
import AddCompetenciaModal from "./addCompetenciaModal";

interface CompetenciasProps {
  competencias: Competencia[];
  handleCompetenciaChange: (index: number, key: "title", value: string) => void;
  handleRemoveCompetencia: (index: number) => void;
  handleAddCompetencia: (value: string) => void;
}

const Competencias: React.FC<CompetenciasProps> = ({
  competencias,
  handleCompetenciaChange,
  handleRemoveCompetencia,
  handleAddCompetencia,
}) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const renderCompetenciaItem = ({
    item,
    index,
  }: {
    item: Competencia;
    index: number;
  }) => (
    <View style={styles.competencia}>
      <View style={styles.inputContainer}>
        <Input
          value={item.title}
          onChangeText={(text) => handleCompetenciaChange(index, "title", text)}
          placeholder="Competencia"
          style={styles.input}
        />
        <TouchableOpacity
          onPress={() => handleRemoveCompetencia(index)}
          style={styles.deleteButton}
        >
          <Image source={require("../assets/icons/trash-icon-black.png")} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View>
      <TouchableOpacity onPress={toggleCollapse} style={styles.header}>
        <Typography size="h5" text="Competencias" />
        <Image source={require("../assets/icons/edit-icon-alternative.png")} />
        <Image
          source={require("../assets/icons/arrow-down-icon-alternative.png")}
          style={[styles.icon, isCollapsed && styles.iconCollapsed]}
        />
      </TouchableOpacity>
      {!isCollapsed && (
        <View>
          <FlatList
            data={competencias}
            renderItem={renderCompetenciaItem}
            keyExtractor={(_, index) => index.toString()}
          />
          <Button
            title="Agregar campo"
            onPress={() => setIsModalVisible(true)}
          />
        </View>
      )}
      <AddCompetenciaModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSave={(value) => {
          handleAddCompetencia(value);
          setIsModalVisible(false);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
  icon: {
    width: 20,
    height: 20,
    transform: [{ rotate: "0deg" }],
    marginLeft: 80,
  },
  iconCollapsed: {
    transform: [{ rotate: "180deg" }],
  },
  competencia: {
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
    flex: 1,
    marginRight: 5,
  },
  deleteButton: {
    position: "absolute",
    right: 1,
    paddingVertical: 6,
    paddingHorizontal: 6,
    backgroundColor: "#FF6B6B",
    borderRadius: 5,
    minWidth: 50,
    alignItems: "center",
    borderWidth: 3,
    borderColor: "black",
    zIndex: 8,
  },
});

export default Competencias;
