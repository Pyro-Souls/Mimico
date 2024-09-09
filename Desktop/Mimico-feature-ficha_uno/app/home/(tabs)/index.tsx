import React, { useEffect } from "react";
import { View, FlatList, Pressable, Text, Alert } from "react-native";
import { router } from "expo-router";
import useStore from "../../../providers/store";
import { addCharacter } from "../../../services/User.service";
import { CharacterData } from "../../../common/types/CharacterData";
import { GlobalSheet } from "../../../core/ui/GlobalSheet";
import {
  Typography,
  Button,
  Input,
  Radio,
  Checkbox,
} from "../../../core/ui/atoms";
import { ContainerUI } from "../../../core/ui/organisms/Container";
import CharacterCard from "../../../components/indexCharachter";

type AddNewCardProps = {
  onPress: () => void;
};

const AddNewCard: React.FC<AddNewCardProps> = ({ onPress }) => (
  <Pressable style={GlobalSheet.addCard} onPress={onPress}>
    <Text style={GlobalSheet.addText}>+</Text>
  </Pressable>
);

const Tab: React.FC = () => {
  const { data, setCurrentCharacter, loadUserCharacters, user } = useStore();

  useEffect(() => {
    if (user?.uid) {
      loadUserCharacters();
    }
  }, [user]);

  const handleAddNewCard = async () => {
    if (user?.uid) {
      if (data.length >= 3) {
        Alert.alert(
          "¡Uh, oh! ¡El Campamento se está llenando!",
          "Vamos a desbloquear uno más grande"
        );
        return;
      }

      const newCharacter: CharacterData = {
        id: String(data.length + 1),
        title: `New Character ${data.length + 1}`,
        userId: user.uid,
        nombre: "Nombre",
        competencias: [],
        imageUri: "",
        characteristicas: [],
      };
      try {
        await addCharacter(user?.uid, newCharacter);
        loadUserCharacters();
        setCurrentCharacter(newCharacter);
        router.push("home/(tabs)/ficha");
      } catch (error) {
        console.error("Error adding new character:", error);
        alert("Failed to add new character");
      }
    }
  };

  return (
    <ContainerUI>
      <View>
        <Typography
          size="sm"
          text={`Current user logged in: ${user?.username || "Guest"}`}
        />
        <Typography
          size="sm"
          text={`Current mimicoins: ${user?.mimicoins || 0}`}
        />
      </View>
      <FlatList
        data={[...data, { id: "add" }]}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => {
          if (item.id === "add") {
            return <AddNewCard onPress={handleAddNewCard} />;
          } else {
            const character = item as CharacterData;
            return (
              <CharacterCard
                characterData={character}
                index={index}
                onPress={() => {
                  setCurrentCharacter(character);
                  router.push("home/(tabs)/ficha");
                }}
              />
            );
          }
        }}
        contentContainerStyle={GlobalSheet.list}
        ListHeaderComponent={() => (
          <View>
            <Typography size="h4" text={`Tus fichas (${data.length}/3)`} />
          </View>
        )}
        ListFooterComponent={() => (
          <View>
            <Button title="Button Test" onPress={() => {}} />
            <Button title="Button Test" variant="outline" onPress={() => {}} />
            <Button title="Button Test" variant="text" onPress={() => {}} />
            <Button title="Button Test" variant="dashed" onPress={() => {}} />
            <Button title="Button Test" onPress={() => {}} icon="add" />

            <Input placeholder="Escriba algo..." label="Usuario" />
            <Input isArea placeholder="Escriba algo..." label="Comentarios" />

            <Radio
              options={[
                { label: "Peru", value: 1 },
                { label: "Colombia", value: 2 },
                { label: "Argentina", value: 3 },
              ]}
            />

            <Checkbox
              options={[
                { label: "Lechuga", value: 1 },
                { label: "Tomate", value: 2 },
                { label: "Queso", value: 3 },
              ]}
            />
          </View>
        )}
      />
    </ContainerUI>
  );
};

export default Tab;
