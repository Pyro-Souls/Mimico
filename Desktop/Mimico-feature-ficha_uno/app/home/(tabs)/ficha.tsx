import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Button,
  Alert,
  TouchableOpacity,
  Image,
} from "react-native";
import { GlobalSheet } from "../../../core/ui";
import { Input, Typography } from "../../../core/ui/atoms";
import { ContainerUI } from "../../../core/ui/organisms";
import useStore from "../../../providers/store";
import { router } from "expo-router";
import {
  updateCharacter,
  removeCharacter,
} from "../../../services/User.service";
import AddCharacteristicaModal from "../../../components/addCharacteristicaModal";
import ImageSection from "../../../components/image";
import Competencias from "../../../components/competencias";
import CharacteristicasList from "../../../components/characteristicas";
import {
  Competencia,
  Characteristicas,
} from "../../../common/types/CharacterData";
import * as ImagePicker from "expo-image-picker";

const CustomHeader = ({
  title,
  onBackPress,
}: {
  title: string;
  onBackPress: () => void;
}) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
        <Image
          source={require("../../../assets/icons/back-icon-alternative.png")}
          style={styles.backIcon}
        />
      </TouchableOpacity>
      <View style={styles.titleContainer}>
        <Typography size="h4" text={title} />
      </View>
    </View>
  );
};

export default function CharacterSheet() {
  const { currentCharacter, data, setData, setCurrentCharacter, user } =
    useStore();
  const [nombre, setNombre] = useState<string>("");
  const [competencias, setCompetencias] = useState<Competencia[]>([]);
  const [characteristicas, setCharacteristicas] = useState<Characteristicas[]>(
    []
  );
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [isDataChanged, setIsDataChanged] = useState<boolean>(false);
  const [imageUri, setImageUri] = useState<string | undefined>(undefined);
  const [deletingImage, setDeletingImage] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  useEffect(() => {
    if (currentCharacter) {
      setNombre(currentCharacter.nombre || "");
      setCompetencias(currentCharacter.competencias || []);
      setCharacteristicas(currentCharacter.characteristicas || []);
      setImageUri(currentCharacter.imageUri);
    } else {
      setNombre("");
      setCompetencias([]);
      setCharacteristicas([]);
      setImageUri(undefined);
    }
  }, [currentCharacter]);

  useEffect(() => {
    if (!isEditMode) {
      setIsDataChanged(false);
    }
  }, [isEditMode]);

  const markAsChanged = () => setIsDataChanged(true);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      markAsChanged();
    }
  };

  const deleteImage = async () => {
    setDeletingImage(true);
    try {
      setImageUri(undefined);
      markAsChanged();
    } finally {
      setDeletingImage(false);
    }
  };

  const handleSave = async () => {
    if (!currentCharacter || !user.uid) {
      Alert.alert("Ошибка", "Персонаж или пользователь не выбран.");
      return;
    }

    try {
      const updatedCharacter = {
        ...currentCharacter,
        nombre,
        competencias,
        characteristicas,
        imageUri: imageUri || "",
      };

      if (typeof currentCharacter.id !== "string") {
        throw new Error("Character ID is not a valid string.");
      }

      await updateCharacter(user.uid, currentCharacter.id, updatedCharacter);

      const updatedData = data.map((char) =>
        char.id === currentCharacter.id ? updatedCharacter : char
      );
      setData(updatedData);
      setCurrentCharacter(updatedCharacter);

      setIsDataChanged(false);
      setIsEditMode(false);

      Alert.alert("Успех", "Данные персонажа успешно сохранены.");
    } catch (error) {
      console.error("Error updating character:", error);
      Alert.alert("Ошибка", "Не удалось сохранить данные персонажа.");
    }
  };

  const handleDelete = async () => {
    if (!currentCharacter || !user.uid) {
      Alert.alert("Ошибка", "Персонаж или пользователь не выбран.");
      return;
    }

    Alert.alert(
      "Подтверждение удаления",
      "Вы уверены, что хотите удалить этого персонажа?",
      [
        {
          text: "Отмена",
          style: "cancel",
        },
        {
          text: "Удалить",
          onPress: async () => {
            try {
              await removeCharacter(user.uid, currentCharacter.id!);

              const updatedData = data.filter(
                (char) => char.id !== currentCharacter.id
              );
              setData(updatedData);
              setCurrentCharacter(null);

              Alert.alert("Удаление", "Персонаж успешно удален.");
              router.back();
            } catch (error) {
              Alert.alert("Ошибка", "Не удалось удалить персонажа.");
            }
          },
          style: "destructive",
        },
      ]
    );
  };

  const handleAddCompetencia = () => {
    setCompetencias([...competencias, { title: "", value: "" }]);
    markAsChanged();
  };

  const handleAddCharacteristica = () => {
    setIsModalVisible(true);
  };

  const handleSaveCharacteristica = (
    type: "number" | "text",
    value: string
  ) => {
    const newCharacteristica: Characteristicas = { title: value, type };
    setCharacteristicas([...characteristicas, newCharacteristica]);
    setIsModalVisible(false);
    markAsChanged();
  };

  const handleCompetenciaChange = (
    index: number,
    key: "title" | "value",
    value: string
  ) => {
    const updatedCompetencias = [...competencias];
    updatedCompetencias[index][key] = value;
    setCompetencias(updatedCompetencias);
    markAsChanged();
  };

  const handleRemoveCompetencia = (index: number) => {
    const updatedCompetencias = competencias.filter((_, i) => i !== index);
    setCompetencias(updatedCompetencias);
    markAsChanged();
  };

  const handleRemoveCharacteristica = (index: number) => {
    const updatedCharacteristicas = characteristicas.filter(
      (_, i) => i !== index
    );
    setCharacteristicas(updatedCharacteristicas);
    markAsChanged();
  };

  const handleBackPress = () => {
    if (isDataChanged) {
      Alert.alert("Unsaved changes", "Are you sure you don't want to save?", [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => router.back(),
        },
      ]);
    } else {
      router.back();
    }
  };

  return (
    <ContainerUI
      header={
        <CustomHeader title="Crea tu ficha" onBackPress={handleBackPress} />
      }
      contentStyle={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View>
          <Typography size="h4" text="Datos generales" />
          <View style={GlobalSheet.card}>
            <Typography size="h5" text="Nombre" />
            <Input
              value={nombre}
              onChangeText={(text) => {
                setNombre(text);
                markAsChanged();
              }}
              placeholder="Rellenar"
            />
            <ImageSection
              imageUri={imageUri}
              pickImage={pickImage}
              deleteImage={deleteImage}
              deletingImage={deletingImage}
            />

            <Competencias
              competencias={competencias}
              handleCompetenciaChange={handleCompetenciaChange}
              handleRemoveCompetencia={handleRemoveCompetencia}
              handleAddCompetencia={handleAddCompetencia}
            />
          </View>

          <View style={GlobalSheet.card}>
            <CharacteristicasList
              characteristicas={characteristicas}
              handleRemoveCharacteristica={handleRemoveCharacteristica}
              handleAddCharacteristica={handleAddCharacteristica}
            />
          </View>
        </View>
        <AddCharacteristicaModal
          visible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          onSave={handleSaveCharacteristica}
        />
      </ScrollView>
      <View style={styles.footer}>
        <Button title="Eliminar Personaje" onPress={handleDelete} />
        <Button title="Guardar Personaje" onPress={handleSave} />
      </View>
    </ContainerUI>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  footer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  backButton: {
    padding: 10,
  },
  backIcon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  titleContainer: {
    left: 80,
    flex: 1,
    alignItems: "center",
  },
});
