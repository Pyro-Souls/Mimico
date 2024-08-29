import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { GlobalSheet } from "../../../core/ui";
import { Button, Input, Typography } from "../../../core/ui/atoms";
import { ContainerUI } from "../../../core/ui/organisms";
import useStore from "../../../providers/store";
import { router } from "expo-router";
import {
  updateCharacter,
  removeCharacter,
} from "../../../services/User.service";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../services/firebase";
import {
  CharacterData,
  Competencia,
} from "../../../common/types/CharacterData";

export default function CharacterSheet() {
  const { currentCharacter, data, setData, setCurrentCharacter, user } =
    useStore();
  const [nombre, setNombre] = useState<string>("");
  const [competencias, setCompetencias] = useState<Competencia[]>([]);
  const [editing, setEditing] = useState<boolean>(false);
  const [imageUri, setImageUri] = useState<string | undefined>(undefined);
  const [uploading, setUploading] = useState<boolean>(false);

  useEffect(() => {
    if (currentCharacter) {
      setNombre(currentCharacter.nombre || "");
      setCompetencias(currentCharacter.competencias || []);
      setImageUri(currentCharacter.imageUri);
    }
  }, [currentCharacter]);

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

  const handleSave = async () => {
    if (currentCharacter && user?.uid) {
      const updatedCharacter: CharacterData = {
        ...currentCharacter,
        nombre,
        competencias,
        imageUri, // imageUri может быть undefined, это нормально
        userId: user.uid,
      };

      try {
        await updateCharacter(user.uid, currentCharacter.id, updatedCharacter);

        const updatedData = data.map((item) =>
          item.id === currentCharacter.id ? updatedCharacter : item
        );
        setData(updatedData);

        alert("Character updated successfully");
        setEditing(false);
        setCurrentCharacter(null);
      } catch (error) {
        console.error("Error updating character:", error);
        alert("Failed to update character");
      }
    }
  };

  const handleAddCompetencia = () => {
    setCompetencias([...competencias, { title: "", value: "" }]);
  };

  const handleCompetenciaChange = (
    index: number,
    key: "title" | "value",
    value: string
  ) => {
    const updatedCompetencias = [...competencias];
    updatedCompetencias[index][key] = value;
    setCompetencias(updatedCompetencias);
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

  return (
    <ContainerUI>
      <ScrollView contentContainerStyle={GlobalSheet.ViewContent}>
        <Button title="Back" onPress={() => router.back()} />

        <Typography size="h4" text="Crea tu ficha" />
        <View style={GlobalSheet.card}>
          <Typography size="h5" text="Datos generales" />
          <Typography size="h6" text="Nombre" />
          <Input
            value={nombre}
            onChangeText={setNombre}
            placeholder="Rellenar"
            editable={editing}
          />

          {/* Image Upload Section */}
          <View style={styles.imageSection}>
            {imageUri ? (
              <Image source={{ uri: imageUri }} style={styles.image} />
            ) : (
              <Button
                title="¡Súbenos tu aspecto!"
                variant="dashed"
                onPress={pickImage}
              />
            )}
          </View>

          {/* Competencias Section */}
          {currentCharacter && (
            <>
              <Typography size="h6" text="Competencias" />
              {competencias.map((competencia: Competencia, index: number) => (
                <View key={index} style={styles.competencia}>
                  <Input
                    value={competencia.title}
                    onChangeText={(text) =>
                      handleCompetenciaChange(index, "title", text)
                    }
                    placeholder="Competencia"
                  />
                  <Input
                    value={competencia.value}
                    onChangeText={(text) =>
                      handleCompetenciaChange(index, "value", text)
                    }
                    placeholder="Valor"
                  />
                </View>
              ))}
              {editing && (
                <Button
                  title="Agregar Competencia"
                  onPress={handleAddCompetencia}
                />
              )}
            </>
          )}

          {/* Display Mode */}
          {!editing && currentCharacter && (
            <>
              <Typography
                size="md"
                text={currentCharacter.nombre || "No name"}
              />
              {currentCharacter.imageUri && (
                <Image
                  source={{ uri: currentCharacter.imageUri }}
                  style={styles.image}
                />
              )}
              {currentCharacter.competencias &&
              currentCharacter.competencias.length > 0 ? (
                currentCharacter.competencias.map(
                  (competencia: Competencia, index: number) => (
                    <View key={index} style={styles.competencia}>
                      <Typography
                        size="sm"
                        text={`${competencia.title}: ${competencia.value}`}
                      />
                    </View>
                  )
                )
              ) : (
                <Text style={styles.noCompetencias}>
                  No competencias available
                </Text>
              )}
            </>
          )}

          <Button
            title={editing ? "Save" : "Edit"}
            onPress={editing ? handleSave : () => setEditing(true)}
          />
          <Button title="Delete" onPress={handleDelete} color="primary" />
        </View>
      </ScrollView>
    </ContainerUI>
  );
}

const styles = StyleSheet.create({
  competencia: {
    marginVertical: 8,
  },
  noCompetencias: {
    textAlign: "center",
    color: "grey",
    marginVertical: 16,
  },
  imageSection: {
    marginVertical: 20,
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  uploadPrompt: {
    color: "blue",
    textDecorationLine: "underline",
  },
});
