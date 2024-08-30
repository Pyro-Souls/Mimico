import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  FlatList,
  Alert,
  Button,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { GlobalSheet } from "../../../core/ui";
import { Input, Typography } from "../../../core/ui/atoms";
import { ContainerUI } from "../../../core/ui/organisms";
import useStore from "../../../providers/store";
import { router } from "expo-router";
import {
  updateCharacter,
  removeCharacter,
} from "../../../services/User.service";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import { storage } from "../../../services/firebase";
import {
  Competencia,
  CharacterData,
  Characteristicas,
} from "../../../common/types/CharacterData";
import CharacteristicaCard from "./characteristicaCard";
import AddCharacteristicaModal from "./addCharacteristicaModal";

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
  const [uploading, setUploading] = useState<boolean>(false);
  const [deletingImage, setDeletingImage] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  useEffect(() => {
    if (currentCharacter) {
      setNombre(currentCharacter.nombre || "");
      setCompetencias(currentCharacter.competencias || []);
      setCharacteristicas(currentCharacter.characteristicas || []);
      setImageUri(currentCharacter.imageUri);
    }
  }, [currentCharacter]);

  useEffect(() => {
    if (!isEditMode) {
      setIsDataChanged(false);
    }
  }, [isEditMode]);

  const markAsChanged = () => setIsDataChanged(true);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      if (uri) {
        await uploadImage(uri);
        markAsChanged();
      }
    }
  };

  const uploadImage = async (uri: string) => {
    setUploading(true);
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const storageRef = ref(
        storage,
        `characters/${user.uid}/${currentCharacter?.id}`
      );
      await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(storageRef);
      setImageUri(downloadURL);
      setUploading(false);
    } catch (error) {
      console.error("Error uploading image: ", error);
      setUploading(false);
    }
  };

  const deleteImage = async () => {
    setDeletingImage(true);
    try {
      if (imageUri) {
        const imageRef = ref(
          storage,
          `characters/${user.uid}/${currentCharacter?.id}`
        );
        await deleteObject(imageRef);
        setImageUri(undefined);
        setDeletingImage(false);
        markAsChanged();
      }
    } catch (error) {
      console.error("Error deleting image: ", error);
      setDeletingImage(false);
    }
  };

  const handleSave = async () => {
    if (currentCharacter && user?.uid) {
      const updatedCharacter: CharacterData = {
        ...currentCharacter,
        nombre,
        competencias,
        characteristicas,
        imageUri,
        userId: user.uid,
      };

      try {
        await updateCharacter(user.uid, currentCharacter.id, updatedCharacter);

        const updatedData = data.map((item) =>
          item.id === currentCharacter.id ? updatedCharacter : item
        );
        setData(updatedData);

        alert("Character updated successfully");
        setIsEditMode(false);
        setIsDataChanged(false);
        setCurrentCharacter(null);
      } catch (error) {
        console.error("Error updating character:", error);
        alert("Failed to update character");
      }
    }
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
    title: string
  ) => {
    const newCharacteristica: Characteristicas = { title, type };
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

  const handleDelete = async () => {
    if (currentCharacter && user?.uid) {
      try {
        await removeCharacter(user.uid, currentCharacter.id);
        const updatedData = data.filter(
          (item) => item.id !== currentCharacter.id
        );
        setData(updatedData);
        setCurrentCharacter(null);
        alert("Character deleted successfully");
      } catch (error) {
        console.error("Error deleting character:", error);
        alert("Failed to delete character");
      }
    }
  };

  const handleEditToggle = () => {
    setIsEditMode(!isEditMode);
    if (!isEditMode) {
      markAsChanged();
    }
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

  const renderCompetenciaItem = ({
    item,
    index,
  }: {
    item: Competencia;
    index: number;
  }) => (
    <View style={styles.competencia}>
      <Input
        value={item.title}
        onChangeText={(text) => handleCompetenciaChange(index, "title", text)}
        placeholder="Competencia"
        editable={isEditMode}
      />
      <Input
        value={item.value}
        onChangeText={(text) => handleCompetenciaChange(index, "value", text)}
        placeholder="Valor"
        editable={isEditMode}
      />
      {isEditMode && (
        <Button
          title="Eliminar campo"
          onPress={() => handleRemoveCompetencia(index)}
          color="red"
        />
      )}
    </View>
  );

  const renderCharacteristicaItem = ({
    item,
    index,
  }: {
    item: Characteristicas;
    index: number;
  }) => (
    <View style={styles.characteristicaCard}>
      <CharacteristicaCard key={index} {...item} />
      {isEditMode && (
        <Button
          title="Eliminar característica"
          onPress={() => handleRemoveCharacteristica(index)}
          color="red"
        />
      )}
    </View>
  );

  return (
    <ContainerUI
      header={{
        title: "Ficha de Personaje",
        leftAction: handleBackPress,
        rightAction: handleEditToggle,
        rightActionTitle: isEditMode ? "Guardar" : "Editar",
        rightActionHandler: isEditMode ? handleSave : handleEditToggle,
      }}
      contentStyle={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View>
          <Typography
            size="h4"
            text="Datos generales"
            style={styles.sectionTitle}
          />
          <View style={GlobalSheet.card}>
            <Typography size="h5" text="Nombre" />
            <Input
              value={nombre}
              onChangeText={(text) => {
                setNombre(text);
                markAsChanged();
              }}
              placeholder="Rellenar"
              editable={isEditMode}
            />
            <View style={styles.imageSection}>
              {imageUri ? (
                <Image source={{ uri: imageUri }} style={styles.image} />
              ) : (
                <Button title="¡Súbenos tu aspecto!" onPress={pickImage} />
              )}
              {imageUri && (
                <>
                  <Button
                    title="Editar image"
                    onPress={pickImage}
                    color="blue"
                  />
                  <Button
                    title={deletingImage ? "Deleting..." : "Delete Image"}
                    onPress={deleteImage}
                    color="red"
                    disabled={deletingImage}
                  />
                </>
              )}
            </View>
            <Typography size="h6" text="Competencias" />
            <FlatList
              data={competencias}
              renderItem={renderCompetenciaItem}
              keyExtractor={(_, index) => index.toString()}
              horizontal
            />
            {isEditMode && (
              <Button
                title="Añadir Competencia"
                onPress={handleAddCompetencia}
                color="blue"
              />
            )}
          </View>
          <Typography
            size="h4"
            text="Características"
            style={styles.sectionTitle}
          />
          <View style={GlobalSheet.card}>
            <FlatList
              data={characteristicas}
              renderItem={renderCharacteristicaItem}
              keyExtractor={(_, index) => index.toString()}
              horizontal
            />
            {isEditMode && (
              <Button
                title="Añadir Característica"
                onPress={handleAddCharacteristica}
                color="blue"
              />
            )}
          </View>
        </View>
        <AddCharacteristicaModal
          visible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          onSave={handleSaveCharacteristica}
        />
      </ScrollView>
      {isEditMode && (
        <View style={styles.footer}>
          <Button
            title="Eliminar Personaje"
            onPress={handleDelete}
            color="red"
          />
        </View>
      )}
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
  sectionTitle: {
    marginBottom: 10,
  },
  competencia: {
    marginBottom: 20,
  },
  imageSection: {
    marginTop: 10,
    marginBottom: 20,
    alignItems: "center",
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  footer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  characteristicaCard: {
    marginBottom: 20,
  },
});
