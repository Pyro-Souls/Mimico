import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { GlobalSheet } from "../../../core/ui";
import { Button, Input, Typography } from "../../../core/ui/atoms";
import { Container } from "../../../core/ui/organisms";
import useStore from "../../../providers/store";
import {
  updateCharacter,
  removeCharacter,
} from "../../../services/User.service";
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

  useEffect(() => {
    if (currentCharacter) {
      setNombre(currentCharacter.nombre || "");
      setCompetencias(currentCharacter.competencias || []);
    }
  }, [currentCharacter]);

  const handleSave = async () => {
    if (currentCharacter && user?.uid) {
      const updatedCharacter: CharacterData = {
        ...currentCharacter,
        nombre,
        competencias,
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
    <Container>
      <ScrollView contentContainerStyle={GlobalSheet.ViewContent}>
        <Typography size="h4" text="Crea tu ficha" />
        <View style={GlobalSheet.card}>
          {editing && currentCharacter ? (
            <>
              <Typography size="h5" text="Datos generales" />
              <Typography size="h6" text="Nombre" />
              <Input
                value={nombre}
                onChangeText={setNombre}
                placeholder="Rellenar"
              />
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
              <Button
                title="Agregar Competencia"
                onPress={handleAddCompetencia}
              />
            </>
          ) : (
            currentCharacter && (
              <>
                <Typography size="h5" text={currentCharacter.title} />
                <Typography
                  size="md"
                  text={currentCharacter.nombre || "No name"}
                />
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
            )
          )}

          <Button
            title={editing ? "Save" : "Edit"}
            onPress={editing ? handleSave : () => setEditing(true)}
          />
          <Button title="Delete" onPress={handleDelete} color="primary" />
        </View>
      </ScrollView>
    </Container>
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
});
