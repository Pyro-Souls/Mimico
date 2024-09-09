import React, { useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { Button, Typography } from "../core/ui/atoms";
import AddCompetenciaModal from "./addCompetenciaModal";

interface Competencia {
  title: string;
  size: string; // Добавляем поле size
}

const Competencias: React.FC = () => {
  const [competencias, setCompetencias] = useState<Competencia[]>([]);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleAddCompetencia = (competencia: {
    text: string;
    size: string;
  }) => {
    setCompetencias((prevCompetencias) => [
      ...prevCompetencias,
      { title: competencia.text, size: competencia.size },
    ]);
  };

  const handleRemoveCompetencia = (index: number) => {
    setCompetencias((prevCompetencias) =>
      prevCompetencias.filter((_, i) => i !== index)
    );
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
        <View style={styles.textContainer}>
          <Typography
            size="h6"
            text={`${item.title} (${item.size})`}
            style={styles.input}
          />
        </View>
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
        onSave={(competencia) => {
          handleAddCompetencia(competencia);
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
    marginLeft: 10,
  },
  iconCollapsed: {
    transform: [{ rotate: "180deg" }],
  },
  competencia: {
    marginBottom: 20,
    borderBottomColor: "#ddd", // Цвет границы
    paddingBottom: 2, // Отступ снизу
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // Отступы по бокам
  },
  textContainer: {
    flex: 1,
    paddingVertical: 7, // Отступы сверху и снизу
    borderWidth: 1, // Граница вокруг текста
    borderColor: "#ddd",
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  input: {
    marginRight: 16,
  },
  deleteButton: {
    paddingVertical: 6,
    paddingHorizontal: 6,
    backgroundColor: "#FF6B6B",
    borderRadius: 5,
    minWidth: 50,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "black",
    zIndex: 8,
  },
});

export default Competencias;
